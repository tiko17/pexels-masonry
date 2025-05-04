import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Photo } from '../../types/pexels';
import { Card, ImageContainer, PhotoImage, PhotoInfo } from './styled';
import { CardVariant, CardElevation, ImageFit } from './styled/types';

// Function to filter styled-component props
const shouldForwardProp = (prop: string) => !prop.startsWith('$');

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
  onLoad?: (height: number) => void;
  variant?: CardVariant;
  elevation?: CardElevation;
  borderRadius?: string;
  objectFit?: ImageFit;
  infoPadding?: string;
  infoFontSize?: string;
  isVisible?: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  onClick,
  onLoad,
  variant = 'default',
  elevation = 'default',
  borderRadius,
  objectFit = 'cover',
  infoPadding,
  infoFontSize,
  isVisible = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current && onLoad) {
      const resizeObserver = new ResizeObserver((entries) => {
        const height = entries[0].contentRect.height;
        onLoad(height);
      });

      resizeObserver.observe(cardRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [onLoad]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    // Preload the next image size
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = photo.src.large;
    document.head.appendChild(link);
  }, [photo.src.large]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onLoad && cardRef.current) {
      onLoad(cardRef.current.offsetHeight);
    }
  };

  return (
    <Card
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      $variant={variant}
      $elevation={elevation}
      $borderRadius={borderRadius}
      $isLoaded={imageLoaded}
      $isHovered={isHovered}
    >
      <ImageContainer $aspectRatio={`${photo.width}/${photo.height}`}>
        {isVisible && (
          <picture>
            <source
              srcSet={photo.src.large}
              media="(min-width: 1200px)"
              type="image/jpeg"
            />
            <PhotoImage
              src={photo.src.medium}
              alt={photo.alt}
              loading="lazy"
              onLoad={handleImageLoad}
              $objectFit={objectFit}
              width={photo.width}
              height={photo.height}
              decoding="async"
            />
          </picture>
        )}
      </ImageContainer>
      <PhotoInfo $padding={infoPadding} $fontSize={infoFontSize}>
        <span>{photo.photographer}</span>
      </PhotoInfo>
    </Card>
  );
};

export default PhotoCard; 