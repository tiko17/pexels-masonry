import { useState, useEffect, useCallback, useRef } from 'react';
import { Photo, PexelsResponse } from '../types/pexels';
import { searchPhotos, getCuratedPhotos } from '../services/pexelsApi';

interface UseSearchPhotosState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  page: number;
}

interface UseSearchPhotosResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
}

export const useSearchPhotos = (query: string): UseSearchPhotosResult => {
  const [state, setState] = useState<UseSearchPhotosState>({
    photos: [],
    loading: false,
    error: null,
    page: 1
  });

  const isInitialMount = useRef(true);
  const loadingRef = useRef(false);
  const currentQueryRef = useRef(query);

  const fetchPhotos = useCallback(async (isLoadMore: boolean = false) => {
    if (loadingRef.current) {
      return;
    }

    try {
      loadingRef.current = true;
      setState(prev => ({ ...prev, loading: true, error: null }));

      const currentPage = isLoadMore ? state.page : 1;
      let response: PexelsResponse;

      if (query.trim()) {
        response = await searchPhotos({
          query: query.trim(),
          page: currentPage,
          per_page: 30
        });
      } else {
        response = await getCuratedPhotos(currentPage, 30);
      }

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
  }, [query, state.page]);

  useEffect(() => {
    // Reset state and fetch new photos when query changes
    if (currentQueryRef.current !== query) {
      currentQueryRef.current = query;
      setState(prev => ({ ...prev, page: 1, photos: [] }));
      fetchPhotos();
    } else if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchPhotos();
    }
  }, [query, fetchPhotos]);

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