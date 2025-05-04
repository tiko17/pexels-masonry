import styled from 'styled-components';
import { PhotoDetailsContainerProps } from '../types';

/**
 * Container component for the photo details page.
 * 
 * @component
 * @example
 * ```tsx
 * <PhotoDetailsContainer maxWidth="1200px" padding="2rem">
 *   {children}
 * </PhotoDetailsContainer>
 * ```
 */
export const PhotoDetailsContainer = styled.div<PhotoDetailsContainerProps>`
  padding: ${({ padding, theme }) => padding || theme.spacing.lg};
  max-width: ${({ maxWidth = '1200px' }) => maxWidth};
  margin: 0 auto;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`; 