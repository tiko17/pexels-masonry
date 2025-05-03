export const COLORS = {
  error: '#dc3545',
  text: {
    primary: '#000000',
    secondary: '#666666',
  },
} as const;

export type Colors = typeof COLORS; 