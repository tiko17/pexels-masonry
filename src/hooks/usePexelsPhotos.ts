import { useState, useEffect, useCallback, useRef } from 'react';
import { Photo } from '../types/pexels';
import { getCuratedPhotos } from '../services/pexelsApi';

interface UsePexelsPhotosState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  page: number;
}

interface UsePexelsPhotosResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
}

export const usePexelsPhotos = (): UsePexelsPhotosResult => {
  const [state, setState] = useState<UsePexelsPhotosState>({
    photos: [],
    loading: false,
    error: null,
    page: 1
  });

  const isInitialMount = useRef(true);
  const loadingRef = useRef(false);

  const fetchPhotos = useCallback(async (isLoadMore: boolean = false) => {
    if (loadingRef.current) {
      return;
    }

    try {
      loadingRef.current = true;
      setState(prev => ({ ...prev, loading: true, error: null }));

      const currentPage = isLoadMore ? state.page : 1;
      const response = await getCuratedPhotos(currentPage, 30);

      setState(prev => ({
        photos: isLoadMore 
          ? [...filterDuplicatePhotos(prev.photos, response.photos)]
          : response.photos,
        loading: false,
        error: null,
        page: currentPage + 1
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to fetch photos',
        loading: false
      }));
    } finally {
      loadingRef.current = false;
    }
  }, [state.page]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchPhotos();
    }
  }, [fetchPhotos]);

  const loadMore = useCallback(async () => {
    if (!state.loading) {
      await fetchPhotos(true);
    }
  }, [fetchPhotos, state.loading]);

  return {
    photos: state.photos,
    loading: state.loading,
    error: state.error,
    loadMore
  };
};

// Helper function to filter out duplicate photos when loading more
const filterDuplicatePhotos = (existingPhotos: Photo[], newPhotos: Photo[]): Photo[] => {
  const existingIds = new Set(existingPhotos.map(p => p.id));
  const uniqueNewPhotos = newPhotos.filter(p => !existingIds.has(p.id));
  return [...existingPhotos, ...uniqueNewPhotos];
}; 