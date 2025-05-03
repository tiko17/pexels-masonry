import { Theme } from '../../../styles/theme';

export interface BaseStyledProps {
  readonly className?: string;
  readonly theme?: Theme;
}

export type LoadingVariant = 'default' | 'compact' | 'fullscreen';

export interface LoadingStateProps {
  variant?: LoadingVariant;
  minHeight?: string;
  spinnerSize?: number;
  spinnerBorderWidth?: number;
  backgroundColor?: string;
  spinnerColor?: string;
  padding?: string;
}

export interface LoadingContainerProps extends BaseStyledProps {
  readonly $variant?: LoadingVariant;
  readonly $minHeight?: string;
  readonly $backgroundColor?: string;
  readonly $padding?: string;
}

export interface LoadingSpinnerProps extends BaseStyledProps {
  readonly $size?: number;
  readonly $borderWidth?: number;
  readonly $color?: string;
} 