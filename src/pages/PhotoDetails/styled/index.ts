import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const BackButton = styled.button`
  border: none;
  background: none;
  padding: 8px 0;
  color: #333;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin: 20px 0;
`;

export const ImageContainer = styled.div<{ $aspectRatio: string }>`
  width: 100%;
  max-height: 80vh;
  margin: 20px 0;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

export const PhotoTitle = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

export const PhotoMeta = styled.div`
  color: #666;
`;

export const PhotographerLink = styled.a`
  color: #0066cc;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export * from './components/photo-details-container.styles';
export * from './components/photo-container.styles';
export * from './components/photo-info.styles';
export * from './components/loading-placeholder.styles';
export * from './components/back-button.styles';
export * from './components/image.styles';
export * from './components/error-message.styles';
export * from './components/photo-meta.styles';
export * from './types'; 