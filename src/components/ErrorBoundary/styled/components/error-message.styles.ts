import styled from 'styled-components';
import { ErrorMessageProps } from '../types';

/**
 * Message component for displaying error information.
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorMessage fontSize={{ title: '2rem', message: '1.1rem' }}>
 *   {children}
 * </ErrorMessage>
 * ```
 */
export const ErrorMessage = styled.div<ErrorMessageProps>`
  margin-bottom: 2rem;

  h2 {
    font-size: ${({ fontSize }) => fontSize?.title || '2rem'};
    color: ${({ color, theme }) => color?.title || theme.colors.text.primary};
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: ${({ fontSize }) => fontSize?.message || '1.1rem'};
    color: ${({ color, theme }) => color?.message || theme.colors.text.secondary};
    line-height: 1.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.md};

    h2 {
      font-size: ${({ fontSize }) => fontSize?.title || '1.75rem'};
    }

    p {
      font-size: ${({ fontSize }) => fontSize?.message || '1rem'};
    }
  }
`; 