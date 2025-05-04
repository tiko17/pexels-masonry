import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { usePexelsPhoto } from '../../hooks/usePexelsPhoto';
import { theme } from '../../styles';
import LoadingState from '../../components/LoadingState';
import {
  PhotoDetailsContainer,
  PhotoContainer,
  PhotoInfo,
  BackButton,
  PhotoImage,
  PhotographerInfo,
  PhotoTitle,
  ErrorMessage,
  LoadingPlaceholder
} from './styled';

/**
 * Component for displaying detailed information about a photo.
 * 
 * @component
 * @example
 * ```tsx
 * <PhotoDetails />
 * ```
 */
const PhotoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { photo, loading, error, imageLoaded, setImageLoaded } = usePexelsPhoto(id);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ThemeProvider theme={theme}>
      <PhotoDetailsContainer>
        <BackButton onClick={handleBack}>← Back</BackButton>
        
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            <PhotoContainer 
              $aspectRatio={photo ? `${photo.width}/${photo.height}` : undefined}
              $maxHeight="80vh"
            >
              {!imageLoaded && (loading || !photo) && (
                <LoadingPlaceholder>
                  <LoadingState />
                </LoadingPlaceholder>
              )}
              {photo && (
                <PhotoImage
                  src={photo.src.original}
                  alt={photo.alt || 'Photo'}
                  onLoad={() => setImageLoaded(true)}
                  $loaded={imageLoaded}
                  loading="lazy"
                />
              )}
            </PhotoContainer>

            {photo && (
              <PhotoInfo>
                <PhotoTitle>{photo.alt || 'Untitled Photo'}</PhotoTitle>
                <PhotographerInfo>
                  Photographer: {photo.photographer}
                  {photo.photographer_url && (
                    <a 
                      href={photo.photographer_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {' '}(View Profile)
                    </a>
                  )}
                </PhotographerInfo>
              </PhotoInfo>
            )}
          </>
        )}
      </PhotoDetailsContainer>
    </ThemeProvider>
  );
};

export default PhotoDetails; 