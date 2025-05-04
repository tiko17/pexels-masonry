import styled from 'styled-components';
import { ScrollContainerProps } from '../types';

/**
 * ScrollContainer component that handles the scrollable area of the grid.
 * Uses attrs for frequently changing styles to reduce class generation.
 * 
 * @component
 * @example
 * ```tsx
 * <ScrollContainer>
 *   {children}
 * </ScrollContainer>
 * ```
 */
export const ScrollContainer = styled.div.attrs<ScrollContainerProps>(() => ({
  style: {
    willChange: 'scroll-position'
  }
}))`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  scroll-behavior: smooth;
  backface-visibility: hidden;
  transform: translateZ(0);
`; 