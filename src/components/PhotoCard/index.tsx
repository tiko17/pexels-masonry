import React, { useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Photo } from '../../types/pexels';
import { theme } from '../../styles';
import { Card, ImageContainer, PhotoImage, PhotoInfo } from './styled';
import { CardVariant, CardElevation, ImageFit } from './styled/types';

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

  return (
    <ThemeProvider theme={theme}>
      <Card
        ref={cardRef}
        onClick={onClick}
        $variant={variant}
        $elevation={elevation}
        $borderRadius={borderRadius}
      >
        <ImageContainer $aspectRatio={`${photo.width}/${photo.height}`}>
          {isVisible && (
            <PhotoImage
              src={photo.src.large}
              alt={photo.alt}
              loading="lazy"
              $objectFit={objectFit}
            />
          )}
        </ImageContainer>
        <PhotoInfo $padding={infoPadding} $fontSize={infoFontSize}>
          <span>{photo.photographer}</span>
        </PhotoInfo>
      </Card>
    </ThemeProvider>
  );
};

export default PhotoCard; 