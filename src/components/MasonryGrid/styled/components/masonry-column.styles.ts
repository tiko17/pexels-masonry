import styled from 'styled-components';
import { MasonryColumnProps } from '../types';

/**
 * MasonryColumn component that represents a single column in the masonry grid.
 * Uses attrs for frequently changing styles to reduce class generation.
 * 
 * @component
 * @example
 * ```tsx
 * <MasonryColumn width={300}>
 *   {children}
 * </MasonryColumn>
 * ```
 */
export const MasonryColumn = styled.div.attrs<MasonryColumnProps>(({ 
  width
}) => ({
  style: {
    width: `${width}px`
  }
}))`
  position: relative;
  flex: 1;
`; 