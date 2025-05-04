import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import MasonryGrid from '../../components/MasonryGrid';
import { HomeContainer } from './styled';

/**
 * Home page component that displays a masonry grid of photos.
 * 
 * @component
 * @example
 * ```tsx
 * <Home />
 * ```
 */
const Home: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <HomeContainer>
        <MasonryGrid />
      </HomeContainer>
    </ThemeProvider>
  );
};

export default Home; 