import styled, { css } from 'styled-components';
import { LoadingContainerProps } from '../types';

/**
 * LoadingContainer component that centers and provides spacing for the loading spinner.
 * 
 * @component
 * @example
 * ```tsx
 * <LoadingContainer 
 *   minHeight="200px"
 *   backgroundColor="rgba(0,0,0,0.05)"
 *   padding="2rem"
 * >
 *   {children}
 * </LoadingContainer>
 * ```
 */

const variantStyles = {
  default: css`
    min-height: 300px;
    padding: ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => `${theme.colors.text.secondary}10`};
  `,
  compact: css`
    min-height: 150px;
    padding: ${({ theme }) => theme.spacing.sm};
    background-color: transparent;
  `,
  fullscreen: css`
    min-height: 100vh;
    padding: ${({ theme }) => theme.spacing.lg};
    background-color: white;
  `
};

export const LoadingContainer = styled.div<LoadingContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  ${({ $variant = 'default' }) => variantStyles[$variant]}
  
  ${({ $minHeight }) => $minHeight && css`
    min-height: ${$minHeight};
  `}
  
  ${({ $backgroundColor }) => $backgroundColor && css`
    background-color: ${$backgroundColor};
  `}
  
  ${({ $padding }) => $padding && css`
    padding: ${$padding};
  `}
`; 