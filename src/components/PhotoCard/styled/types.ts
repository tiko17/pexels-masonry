import { Theme } from '../../../styles/theme';

export type CardVariant = 'default' | 'compact' | 'featured';
export type CardElevation = 'default' | 'raised';
export type ImageFit = 'cover' | 'contain';

export interface BaseStyledProps {
  readonly className?: string;
  readonly theme?: Theme;
}

export interface CardProps extends BaseStyledProps {
  $variant?: CardVariant;
  $elevation?: CardElevation;
  $borderRadius?: string;
}

export interface ImageContainerProps extends BaseStyledProps {
  $aspectRatio: string;
}

export interface PhotoImageProps extends BaseStyledProps {
  $objectFit?: ImageFit;
  $loaded?: boolean;
}

export interface PhotoInfoProps extends BaseStyledProps {
  $padding?: string;
  $fontSize?: string;
} 