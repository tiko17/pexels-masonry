export const GRID = {
  columnWidth: 280,
  loadThreshold: 800,
  bufferSize: 2000,
  gapSize: 24,
  minColumns: 1,
  maxColumns: 5,
  maxHeightDifference: 1000,
  maxContentWidth: '1440px',
} as const;

export type Grid = typeof GRID;