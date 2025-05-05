import styled from 'styled-components';

export const SearchSection = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;