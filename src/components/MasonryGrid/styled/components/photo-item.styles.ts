import styled from 'styled-components';
import { PhotoItemProps } from '../types';

/**
 * PhotoItem component that handles individual photo positioning in the grid.
 * Uses attrs for frequently changing styles to reduce class generation.
 * 
 * @component
 * @example
 * ```tsx
 * <PhotoItem offset={100} height={200}>
 *   {children}
 * </PhotoItem>
 * ```
 */
export const PhotoItem = styled.div.attrs<PhotoItemProps>(({ 
  offset,
  height
}) => ({
  style: {
    transform: `translateY(${offset}px)`,
    height: `${height}px`
  }
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  will-change: transform;
`; 