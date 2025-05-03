import { SPACING, COLORS, BREAKPOINTS, GRID } from '../constants';

export const theme = {
  spacing: SPACING,
  colors: COLORS,
  breakpoints: BREAKPOINTS,
  grid: GRID,
} as const;

export type Theme = typeof theme; 