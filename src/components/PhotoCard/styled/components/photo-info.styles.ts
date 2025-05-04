import styled from 'styled-components';
import { PhotoInfoProps } from '../types';

/**
 * PhotoInfo component for displaying photo metadata.
 * 
 * @component
 * @example
 * ```tsx
 * <PhotoInfo $padding={theme.spacing.sm} $fontSize="0.9rem">
 *   {children}
 * </PhotoInfo>
 * ```
 */
export const PhotoInfo = styled.div<PhotoInfoProps>`
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ $padding, theme }) => $padding || theme.spacing.sm};
  font-size: ${({ $fontSize }) => $fontSize || '0.9rem'};
`; 