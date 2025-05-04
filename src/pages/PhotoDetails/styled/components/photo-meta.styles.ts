import styled from 'styled-components';

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