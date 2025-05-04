import styled, { css } from 'styled-components';
import { ErrorMessageProps } from '../types';

const errorMessageVariants = {
  default: css`
    font-size: 1.1rem;
    opacity: 1;
  `,
  subtle: css`
    font-size: 1rem;
    opacity: 0.8;
  `,
};

/**
 * ErrorMessage component for displaying error states.
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorMessage variant="subtle">
 *   Something went wrong
 * </ErrorMessage>
 * ```
 */
export const ErrorMessage = styled.div<ErrorMessageProps>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.error};
  width: 100%;
  ${({ variant = 'default' }) => errorMessageVariants[variant]}
`; 