import { Theme } from '../../../styles/theme';

export interface BaseStyledProps {
  readonly className?: string;
  readonly theme?: Theme;
}

export interface PhotoDetailsContainerProps extends BaseStyledProps {
  padding?: string;
  maxWidth?: string;
}

export interface PhotoContainerProps extends BaseStyledProps {
  $aspectRatio?: string;
  $maxHeight?: string;
}

export interface PhotoImageProps extends BaseStyledProps {
  $loaded?: boolean;
}

export interface PhotoInfoProps extends BaseStyledProps {
  padding?: string;
}

export interface PhotoTitleProps extends BaseStyledProps {
  fontSize?: string;
  color?: string;
}

export interface PhotographerInfoProps extends BaseStyledProps {
  fontSize?: string;
  color?: string;
}

export interface BackButtonProps extends BaseStyledProps {
  fontSize?: string;
  margin?: string;
}

export interface LoadingPlaceholderProps extends BaseStyledProps {
  height?: string;
  backgroundColor?: string;
}

export interface ErrorMessageProps extends BaseStyledProps {
  fontSize?: string;
  color?: string;
  margin?: string;
} 