import styled from 'styled-components';
import { SearchContainerProps } from '../types';

/**
 * SearchContainer component that wraps the search input and button.
 * 
 * @component
 * @example
 * ```tsx
 * <SearchContainer maxWidth="800px" gap="1rem">
 *   {children}
 * </SearchContainer>
 * ```
 */
export const SearchContainer = styled.form<SearchContainerProps>`
  display: flex;
  gap: 1rem;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`; 