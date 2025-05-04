import styled from 'styled-components';
import { BackButtonProps } from '../types';

/**
 * Navigation button to go back.
 * 
 * @component
 * @example
 * ```tsx
 * <BackButton fontSize="1.1rem" margin="1rem">
 *   ← Back
 * </BackButton>
 * ```
 */
export const BackButton = styled.button<BackButtonProps>`
  background: none;
  border: none;
  font-size: ${({ fontSize = '1.1rem' }) => fontSize};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  margin: ${({ margin, theme }) => margin || theme.spacing.sm} 0;
  display: flex;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(-4px);
  }

  &:focus {
    outline: none;
    background-color: ${({ theme }) => `${theme.colors.text.secondary}10`};
    border-radius: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    padding: ${({ theme }) => theme.spacing.xs};
  }
`; 