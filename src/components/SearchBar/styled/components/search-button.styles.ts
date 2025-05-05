import styled, { css } from 'styled-components';
import { SearchButtonProps } from '../types';

const buttonStates = {
  hover: css`
    background: ${({ theme }) => `${theme.colors.text.primary}33`};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `,
  active: css`
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `,
  disabled: css`
    background: ${({ theme }) => `${theme.colors.text.secondary}40`};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  `,
};

/**
 * SearchButton component for submitting the search.
 * 
 * @component
 * @example
 * ```tsx
 * <SearchButton minWidth="120px" fontSize="1.125rem" padding="1rem 2rem" />
 * ```
 */
export const SearchButton = styled.button<SearchButtonProps>`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.text.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-width: 100px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    ${buttonStates.hover}
  }

  &:active:not(:disabled) {
    ${buttonStates.active}
  }

  &:disabled {
    ${buttonStates.disabled}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0.75rem 1rem;
    min-width: 90px;
    border-radius: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.5rem 0.75rem;
    min-width: 70px;
  }
`; 