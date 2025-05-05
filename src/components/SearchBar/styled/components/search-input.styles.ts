import styled from 'styled-components';
import { SearchInputProps } from '../types';

/**
 * SearchInput component for text input in the search bar.
 * 
 * @component
 * @example
 * ```tsx
 * <SearchInput fontSize="1.125rem" padding="1rem 1.5rem" />
 * ```
 */
export const SearchInput = styled.input<SearchInputProps>`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme }) => `${theme.colors.text.secondary}20`};
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease-in-out;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: ${({ theme }) => `${theme.colors.text.secondary}40`};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.text.primary};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => `${theme.colors.text.secondary}80`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border-radius: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.5rem 0.75rem;
  }
`; 