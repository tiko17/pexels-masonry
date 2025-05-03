import styled from 'styled-components';
import { ErrorContainerProps } from '../types';

/**
 * Container component for the error boundary that centers its content.
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorContainer minHeight="50vh" padding="2rem">
 *   {children}
 * </ErrorContainer>
 * ```
 */
export const ErrorContainer = styled.div<ErrorContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ minHeight = '100vh' }) => minHeight};
  padding: ${({ padding, theme }) => padding || theme.spacing.lg};
  text-align: center;
  background-color: white;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`; 