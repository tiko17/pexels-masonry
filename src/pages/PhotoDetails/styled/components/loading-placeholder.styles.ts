import styled from 'styled-components';
import { LoadingPlaceholderProps, ErrorMessageProps } from '../types';

/**
 * Placeholder component while loading.
 * 
 * @component
 * @example
 * ```tsx
 * <LoadingPlaceholder height="400px">
 *   {children}
 * </LoadingPlaceholder>
 * ```
 */
export const LoadingPlaceholder = styled.div<LoadingPlaceholderProps>`
  width: 100%;
  height: ${({ height = '400px' }) => height};
  background-color: ${({ backgroundColor, theme }) => backgroundColor || `${theme.colors.text.secondary}10`};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

/**
 * Component for displaying error messages.
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorMessage fontSize="1.1rem" color="#dc3545">
 *   Error loading photo
 * </ErrorMessage>
 * ```
 */
export const ErrorMessage = styled.div<ErrorMessageProps>`
  font-size: ${({ fontSize = '1.1rem' }) => fontSize};
  color: ${({ color, theme }) => color || theme.colors.error};
  text-align: center;
  margin: ${({ margin, theme }) => margin || theme.spacing.md} 0;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => `${theme.colors.error}10`};
  border-radius: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`; 