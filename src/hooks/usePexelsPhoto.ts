import { useState, useEffect } from 'react';
import { Photo } from '../types/pexels';
import { getPhotoById } from '../services/pexelsApi';

interface UsePexelsPhotoResult {
  photo: Photo | null;
  loading: boolean;
  error: string | null;
}

export const usePexelsPhoto = (id: string | undefined): UsePexelsPhotoResult => {
  const [state, setState] = useState<UsePexelsPhotoResult>({
    photo: null,
    loading: Boolean(id),
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    let mounted = true;

    const fetchPhoto = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const photo = await getPhotoById(id);
        
        if (mounted) {
          setState(prev => ({ 
            ...prev, 
            photo,
            loading: false
          }));

          // Preload the large version
          const img = new Image();
          img.src = photo.src.large;
        }
      } catch (err) {
        if (mounted) {
          setState(prev => ({
            ...prev,
            error: err instanceof Error ? err.message : 'Failed to load photo',
            loading: false
          }));
        }
      }
    };

    fetchPhoto();

    return () => {
      mounted = false;
    };
  }, [id]);

  return state;
}; 