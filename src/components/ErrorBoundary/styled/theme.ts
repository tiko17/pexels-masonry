import 'styled-components';
import { Theme } from '../../../styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export interface BaseStyledProps {
  readonly className?: string;
  readonly theme?: Theme;
} 