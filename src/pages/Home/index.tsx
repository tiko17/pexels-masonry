import React, { lazy, Suspense, useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import LoadingState from '../../components/LoadingState';
import SearchBar from '../../components/SearchBar';
import { HomeContainer, SearchSection } from './styled';

const MasonryGrid = lazy(() => import('../../components/MasonryGrid'));

/**
 * Home page component that displays a search bar and a masonry grid of photos.
 * 
 * @component
 * @example
 * ```tsx
 * <Home />
 * ```
 */
const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <HomeContainer>
        <SearchSection>
          <SearchBar 
            onSearch={handleSearch}
            initialValue={searchQuery}
          />
        </SearchSection>
        <Suspense fallback={<LoadingState />}>
          <MasonryGrid searchQuery={searchQuery} />
        </Suspense>
      </HomeContainer>
    </ThemeProvider>
  );
};

export default Home; 