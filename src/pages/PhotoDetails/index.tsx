import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePexelsPhoto } from '../../hooks/usePexelsPhoto';
import {
  Container,
  BackButton,
  ErrorMessage,
  ImageContainer,
  Image,
  PhotoTitle,
  PhotoMeta,
  PhotographerLink
} from './styled';

const PhotoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { photo, error, loading } = usePexelsPhoto(id);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        ← Back
      </BackButton>
      
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : loading ? (
        <ImageContainer $aspectRatio="16/9">
          <div>Loading...</div>
        </ImageContainer>
      ) : photo && (
        <>
          <ImageContainer $aspectRatio={`${photo.width}/${photo.height}`}>
            <picture>
              {/* Show a smaller image first for faster initial load */}
              <source
                srcSet={photo.src.medium}
                media="(max-width: 768px)"
                type="image/jpeg"
              />
              <source
                srcSet={photo.src.large}
                media="(min-width: 769px)"
                type="image/jpeg"
              />
              <Image 
                src={photo.src.medium}
                alt={photo.alt || 'Photo'}
                onLoad={() => setImageLoaded(true)}
                className={imageLoaded ? 'loaded' : ''}
                loading="eager"
                decoding="async"
              />
            </picture>
          </ImageContainer>
          <div>
            <PhotoTitle>
              {photo.alt || 'Untitled Photo'}
            </PhotoTitle>
            <PhotoMeta>
              Photographer: {photo.photographer}
              {photo.photographer_url && (
                <PhotographerLink 
                  href={photo.photographer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}(View Profile)
                </PhotographerLink>
              )}
            </PhotoMeta>
          </div>
        </>
      )}
    </Container>
  );
};

export default PhotoDetails; 