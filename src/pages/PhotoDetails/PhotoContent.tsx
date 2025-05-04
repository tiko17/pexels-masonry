import React, { useState } from 'react';
import { Photo } from '../../types/pexels';
import LoadingState from '../../components/LoadingState';
import {
  PhotoContainer,
  PhotoInfo,
  PhotoImage,
  PhotographerInfo,
  PhotoTitle,
  LoadingPlaceholder
} from './styled';

interface PhotoContentProps {
  photo: Photo | null;
  loading: boolean;
}

const PhotoContent: React.FC<PhotoContentProps> = ({ photo, loading }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!photo) {
    return loading ? (
      <PhotoContainer>
        <LoadingPlaceholder>
          <LoadingState />
        </LoadingPlaceholder>
      </PhotoContainer>
    ) : null;
  }

  return (
    <>
      <PhotoContainer 
        $aspectRatio={`${photo.width}/${photo.height}`}
        $maxHeight="80vh"
      >
        {(!isImageLoaded || loading) && (
          <LoadingPlaceholder>
            <LoadingState />
          </LoadingPlaceholder>
        )}
        <PhotoImage
          src={photo.src.large}
          alt={photo.alt || 'Photo'}
          onLoad={() => setIsImageLoaded(true)}
          $loaded={isImageLoaded}
        />
      </PhotoContainer>

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
    </>
  );
};

export default PhotoContent; 