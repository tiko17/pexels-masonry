import { useState, useEffect } from 'react';
import { Photo } from '../types/pexels';
import { getPhotoById } from '../services/pexelsApi';

interface UsePexelsPhotoResult {
  photo: Photo | null;
  loading: boolean;
  error: string | null;
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
}

export const usePexelsPhoto = (id: string | undefined): UsePexelsPhotoResult => {
  const [state, setState] = useState<{
    photo: Photo | null;
    loading: boolean;
    error: string | null;
    imageLoaded: boolean;
  }>({
    photo: null,
    loading: true,
    error: null,
    imageLoaded: false,
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
            loading: false,
            imageLoaded: false // Reset image loaded state for new photo
          }));
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

  const setImageLoaded = (loaded: boolean) => {
    setState(prev => ({ ...prev, imageLoaded: loaded }));
  };

  return {
    ...state,
    setImageLoaded
  };
}; 