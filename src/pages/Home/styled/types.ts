import { Theme } from '../../../styles/theme';

export interface BaseStyledProps {
  readonly className?: string;
  readonly theme?: Theme;
}

export interface HomeContainerProps extends BaseStyledProps {
  maxWidth?: string;
  minHeight?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
} 