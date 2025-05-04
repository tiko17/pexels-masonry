import styled from 'styled-components';
import { GridContainerProps } from '../types';

/**
 * GridContainer component that serves as the main wrapper for the masonry grid.
 * Uses attrs for frequently changing styles to reduce class generation.
 * 
 * @component
 * @example
 * ```tsx
 * <GridContainer>
 *   {children}
 * </GridContainer>
 * ```
 */
export const GridContainer = styled.div.attrs<GridContainerProps>(() => ({
  style: {
    willChange: 'contents',
    transform: 'translateZ(0)'
  }
}))`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0 auto;
  backface-visibility: hidden;

  > div {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0;
  }
`; 