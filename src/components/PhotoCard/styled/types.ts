import { Theme } from '../../../styles/theme';

export type CardVariant = 'default' | 'compact' | 'featured';
export type CardElevation = 'default' | 'raised';
export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export interface BaseStyledProps {
  readonly className?: string;
  readonly theme?: Theme;
}

export interface CardProps extends BaseStyledProps {
  $variant?: CardVariant;
  $elevation?: CardElevation;
  $borderRadius?: string;
  $isLoaded?: boolean;
  $isHovered?: boolean;
}

export interface ImageContainerProps extends BaseStyledProps {
  $aspectRatio: string;
}

export interface PhotoImageProps extends BaseStyledProps {
  $objectFit?: ImageFit;
}

export interface PhotoInfoProps extends BaseStyledProps {
  $padding?: string;
  $fontSize?: string;
} 