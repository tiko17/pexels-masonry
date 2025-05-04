import styled from 'styled-components';
import { PhotoContainerProps, PhotoImageProps } from '../types';

/**
 * Container component for the photo image.
 * 
 * @component
 * @example
 * ```tsx
 * <PhotoContainer aspectRatio="16/9" maxHeight="80vh">
 *   {children}
 * </PhotoContainer>
 * ```
 */
export const PhotoContainer = styled.div<PhotoContainerProps>`
  position: relative;
  width: 100%;
  max-height: ${({ $maxHeight = '80vh' }) => $maxHeight};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  overflow: hidden;
  border-radius: 8px;
  background-color: ${({ theme }) => `${theme.colors.text.secondary}10`};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

/**
 * Image component with fade-in animation.
 * 
 * @component
 * @example
 * ```tsx
 * <PhotoImage src="image.jpg" alt="Description" $loaded={true} />
 * ```
 */
export const PhotoImage = styled.img<PhotoImageProps>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`; 