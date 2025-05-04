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
  gap: ${({ gap = '1rem' }) => gap};
  margin: ${({ theme }) => theme.spacing.lg} auto;
  max-width: ${({ maxWidth = '800px' }) => maxWidth};
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.sm};
    margin: ${({ theme }) => theme.spacing.md} auto;
  }
`; 