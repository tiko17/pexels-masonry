import { useState, useEffect, useCallback, useRef } from 'react';
import { Photo, PexelsResponse } from '../types/pexels';
import { getCuratedPhotos } from '../services/pexelsApi';

interface UsePexelsPhotosResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
}

export const usePexelsPhotos = (): UsePexelsPhotosResult => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const isInitialMount = useRef(true);
  const loadingRef = useRef(false);

  const fetchPhotos = useCallback(async (isLoadMore: boolean = false) => {
    if (loadingRef.current) {
      return;
    }

    try {
      setLoading(true);
      loadingRef.current = true;
      setError(null);

      const currentPage = isLoadMore ? page : 1;
      const response = await getCuratedPhotos(currentPage, 30);

      setPhotos(prev => {
        if (isLoadMore) {
          const existingIds = new Set(prev.map(p => p.id));
          const newPhotos = response.photos.filter(p => !existingIds.has(p.id));
          return [...prev, ...newPhotos];
        }
        return response.photos;
      });
      
      setPage(currentPage + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch photos');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [page]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchPhotos();
    }
  }, [fetchPhotos]);

  const loadMore = useCallback(async () => {
    if (!loading) {
      await fetchPhotos(true);
    }
  }, [fetchPhotos, loading]);

  return {
    photos,
    loading,
    error,
    loadMore,
  };
}; 