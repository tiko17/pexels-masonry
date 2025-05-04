import { Theme } from '../../../styles/theme';

export interface BaseStyledProps {
  readonly className?: string;
  readonly theme?: Theme;
  style?: React.CSSProperties;
}

export interface GridContainerProps extends BaseStyledProps {
  readonly isFullWidth?: boolean;
}

export interface VirtualContainerProps extends BaseStyledProps {
  readonly $totalHeight: number;
  readonly $totalWidth: string;
}

export interface MasonryColumnProps extends BaseStyledProps {
  readonly width: number;
}

export interface ErrorMessageProps extends BaseStyledProps {
  readonly variant?: 'default' | 'subtle';
}

export interface PhotoItemProps extends BaseStyledProps {
  readonly offset: number;
  readonly height: number;
}

export interface ScrollContainerProps extends BaseStyledProps {} 