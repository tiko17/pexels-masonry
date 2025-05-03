import styled, { keyframes } from 'styled-components';
import { LoadingSpinnerProps } from '../types';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

/**
 * LoadingSpinner component that shows an animated loading indicator.
 * 
 * @component
 * @example
 * ```tsx
 * <LoadingSpinner 
 *   $size={40} 
 *   $borderWidth={3}
 *   $color="#000000"
 * />
 * ```
 */
export const LoadingSpinner = styled.div<LoadingSpinnerProps>`
  width: ${({ $size = 40 }) => `${$size}px`};
  height: ${({ $size = 40 }) => `${$size}px`};
  border: ${({ $borderWidth = 3, theme, $color }) => 
    `${$borderWidth}px solid ${$color || `${theme.colors.text.secondary}20`}`};
  border-top: ${({ $borderWidth = 3, theme, $color }) => 
    `${$borderWidth}px solid ${$color || theme.colors.text.primary}`};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  transition: border-color 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: ${({ $size = 40 }) => `${Math.max($size * 0.8, 24)}px`};
    height: ${({ $size = 40 }) => `${Math.max($size * 0.8, 24)}px`};
    border-width: ${({ $borderWidth = 3 }) => `${Math.max($borderWidth * 0.8, 2)}px`};
  }
`; 