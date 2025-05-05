import React, { useState, useCallback, useEffect, memo } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import { SearchContainer, SearchInput, SearchButton } from './styled';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = memo(({
  onSearch,
  initialValue = '',
}) => {
  const [query, setQuery] = useState(initialValue);

  // Only update internal state when initialValue prop changes
  useEffect(() => {
    if (initialValue !== query) {
      setQuery(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  }, [query, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // If the input is cleared, trigger search with empty string
    if (!e.target.value.trim()) {
      onSearch('');
    }
  }, [onSearch]);

  return (
    <ThemeProvider theme={theme}>
      <SearchContainer onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Search for photos..."
          value={query}
          onChange={handleChange}
          aria-label="Search photos"
        />
        <SearchButton 
          type="submit"
          disabled={!query.trim()}
          aria-label="Submit search"
        >
          Search
        </SearchButton>
      </SearchContainer>
    </ThemeProvider>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar; 