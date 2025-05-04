import styled, { css } from 'styled-components';
import { CardProps, CardElevation } from '../types';

const elevations: Record<CardElevation, { boxShadow: string; hoverBoxShadow: string }> = {
  default: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    hoverBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
  },
  raised: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    hoverBoxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
  }
};

const variants = {
  default: css`
    border-radius: 8px;
  `,
  compact: css`
    border-radius: 4px;
  `,
  featured: css`
    border-radius: 12px;
    padding: ${({ theme }) => theme.spacing.sm};
  `
};

/**
 * Card component that wraps the photo and info.
 * 
 * @component
 * @example
 * ```tsx
 * <Card $variant="featured" $elevation="raised" $isLoaded={true} $isHovered={false}>
 *   {children}
 * </Card>
 * ```
 */
export const Card = styled.div<CardProps & { $isLoaded: boolean; $isHovered: boolean }>`
  overflow: hidden;
  background: white;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.3s ease-in-out;
  border-radius: ${({ $borderRadius }) => $borderRadius || 'inherit'};
  box-shadow: ${({ $elevation = 'default' }) => elevations[$elevation].boxShadow};
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  transform: ${({ $isHovered }) => ($isHovered ? 'scale(1.02)' : 'scale(1)')};

  ${({ $variant = 'default' }) => variants[$variant]}

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ $elevation = 'default' }) => elevations[$elevation].hoverBoxShadow};
  }
`; 