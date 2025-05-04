import styled from 'styled-components';
import { PhotoImageProps } from '../types';

/**
 * PhotoImage component for displaying the actual photo.
 * Uses transient props to prevent them from being passed to the DOM.
 * 
 * @component
 * @example
 * ```tsx
 * <PhotoImage $objectFit="cover" src="path/to/image.jpg" alt="Description" />
 * ```
 */
export const PhotoImage = styled.img<PhotoImageProps>`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: ${({ $objectFit = 'cover' }) => $objectFit};
`; 