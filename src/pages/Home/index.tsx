import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import LoadingState from '../../components/LoadingState';
import { HomeContainer } from './styled';

const MasonryGrid = lazy(() => import('../../components/MasonryGrid'));

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
        <Suspense fallback={<LoadingState />}>
          <MasonryGrid />
        </Suspense>
      </HomeContainer>
    </ThemeProvider>
  );
};

export default Home; 