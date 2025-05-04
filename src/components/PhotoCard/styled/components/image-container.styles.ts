import styled from 'styled-components';
import { ImageContainerProps } from '../types';

/**
 * ImageContainer component that wraps the photo image.
 * Uses attrs for frequently changing styles to reduce class generation.
 * 
 * @component
 * @example
 * ```tsx
 * <ImageContainer style={{ aspectRatio: '16/9' }}>
 *   {children}
 * </ImageContainer>
 * ```
 */
export const ImageContainer = styled.div.attrs<ImageContainerProps>(({ 
  $aspectRatio
}) => ({
  style: {
    aspectRatio: $aspectRatio
  }
}))`
  width: 100%;
  position: relative;
`; 