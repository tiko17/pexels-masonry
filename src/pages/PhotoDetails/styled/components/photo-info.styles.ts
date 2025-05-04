import styled from 'styled-components';
import { PhotoInfoProps, PhotoTitleProps, PhotographerInfoProps } from '../types';

/**
 * Container for photo metadata.
 * 
 * @component
 * @example
 * ```tsx
 * <PhotoInfo padding="1rem">
 *   {children}
 * </PhotoInfo>
 * ```
 */
export const PhotoInfo = styled.div<PhotoInfoProps>`
  padding: ${({ padding, theme }) => padding || theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

/**
 * Title component for the photo.
 * 
 * @component
 * @example
 * ```tsx
 * <PhotoTitle fontSize="2rem" color="#333">
 *   Photo Title
 * </PhotoTitle>
 * ```
 */
export const PhotoTitle = styled.h1<PhotoTitleProps>`
  font-size: ${({ fontSize = '2rem' }) => fontSize};
  color: ${({ color, theme }) => color || theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

/**
 * Component for photographer information.
 * 
 * @component
 * @example
 * ```tsx
 * <PhotographerInfo fontSize="1.1rem" color="#666">
 *   By John Doe
 * </PhotographerInfo>
 * ```
 */
export const PhotographerInfo = styled.div<PhotographerInfoProps>`
  font-size: ${({ fontSize = '1.1rem' }) => fontSize};
  color: ${({ color, theme }) => color || theme.colors.text.secondary};
  line-height: 1.5;

  a {
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`; 