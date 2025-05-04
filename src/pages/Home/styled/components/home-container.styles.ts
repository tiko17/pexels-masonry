import styled from 'styled-components';
import { HomeContainerProps } from '../types';
import { GRID } from '../../../../styles/constants';

/**
 * Container component for the home page that provides layout and spacing.
 * Uses attrs for frequently changing styles to reduce class generation.
 * 
 * @component
 * @example
 * ```tsx
 * <HomeContainer maxWidth={GRID.maxContentWidth} style={{ backgroundColor: 'white' }}>
 *   {children}
 * </HomeContainer>
 * ```
 */
export const HomeContainer = styled.div.attrs<HomeContainerProps>(({ 
  maxWidth = GRID.maxContentWidth,
  minHeight = '100vh',
  backgroundColor = 'white',
  theme
}) => ({
  style: {
    maxWidth,
    minHeight,
    backgroundColor,
    padding: theme?.spacing?.lg
  }
}))`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    && {
      padding: ${({ theme }) => theme.spacing.md};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    && {
      padding: ${({ theme }) => theme.spacing.sm};
    }
  }
`; 