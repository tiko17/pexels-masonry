import styled from 'styled-components';

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
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.loaded {
    opacity: 1;
  }
`; 