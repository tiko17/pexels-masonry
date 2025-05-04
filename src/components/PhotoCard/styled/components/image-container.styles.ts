import styled from 'styled-components';
import { ImageContainerProps } from '../types';

/**
 * ImageContainer component that wraps the photo image.
 * Uses attrs for frequently changing styles to reduce class generation.
 * 
 * @component
 * @example
 * ```tsx
 * <ImageContainer $aspectRatio="16/9">
 *   {children}
 * </ImageContainer>
 * ```
 */
export const ImageContainer = styled.div<ImageContainerProps>`
  width: 100%;
  position: relative;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`; 