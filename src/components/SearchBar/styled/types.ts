import { Theme } from '../../../styles/theme';

export interface BaseStyledProps {
  readonly className?: string;
  readonly theme?: Theme;
}

export interface SearchContainerProps extends BaseStyledProps {
  readonly maxWidth?: string;
  readonly gap?: string;
}

export interface SearchInputProps extends BaseStyledProps {
  readonly fontSize?: string;
  readonly padding?: string;
}

export interface SearchButtonProps extends BaseStyledProps {
  readonly minWidth?: string;
  readonly fontSize?: string;
  readonly padding?: string;
  readonly disabled?: boolean;
} 