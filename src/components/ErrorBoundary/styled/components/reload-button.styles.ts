import styled, { css } from 'styled-components';
import { ReloadButtonProps } from '../types';

const buttonSizes = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `,
};

const buttonVariants = {
  primary: css`
    background: ${({ theme }) => theme.colors.text.primary};
    color: white;
    
    &:hover {
      background: ${({ theme }) => `${theme.colors.text.primary}dd`};
    }
  `,
  secondary: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border: 2px solid ${({ theme }) => theme.colors.text.primary};
    
    &:hover {
      background: ${({ theme }) => `${theme.colors.text.primary}11`};
    }
  `,
};

/**
 * Button component for reloading the page after an error.
 * 
 * @component
 * @example
 * ```tsx
 * <ReloadButton variant="primary" size="medium">
 *   Reload Page
 * </ReloadButton>
 * ```
 */
export const ReloadButton = styled.button<ReloadButtonProps>`
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${({ size = 'medium' }) => buttonSizes[size]};
  ${({ variant = 'primary' }) => buttonVariants[variant]};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.text.primary}33`};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${buttonSizes.small}
  }
`; 