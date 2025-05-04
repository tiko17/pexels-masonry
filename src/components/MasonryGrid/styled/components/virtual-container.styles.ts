import styled, { css } from 'styled-components';
import { VirtualContainerProps } from '../types';

const virtualContainerBase = css`
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

/**
 * VirtualContainer component that handles the virtual scrolling container.
 * Uses attrs for frequently changing styles to reduce class generation.
 * 
 * @component
 * @example
 * ```tsx
 * <VirtualContainer $totalHeight={1000} $totalWidth="1200px">
 *   {children}
 * </VirtualContainer>
 * ```
 */
export const VirtualContainer = styled.div.attrs<VirtualContainerProps>(({ 
  $totalHeight,
  $totalWidth,
  theme
}) => ({
  style: {
    height: `${$totalHeight}px`,
    width: $totalWidth,
    padding: theme?.spacing?.md,
    gap: `${theme?.grid?.gapSize}px`
  }
}))`
  ${virtualContainerBase}
  max-width: 100%;
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    && {
      padding: ${({ theme }) => theme.spacing.sm};
      gap: ${({ theme }) => theme.grid.gapSize / 2}px;
    }
  }
`; 