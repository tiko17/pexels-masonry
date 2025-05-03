export const BREAKPOINTS = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
} as const;

export type Breakpoints = typeof BREAKPOINTS; 