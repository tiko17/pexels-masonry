import React, { useState, useCallback, useEffect, memo } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import { SearchContainer, SearchInput, SearchButton } from './styled';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  maxWidth?: string;
  gap?: string;
  inputFontSize?: string;
  inputPadding?: string;
  buttonMinWidth?: string;
  buttonFontSize?: string;
  buttonPadding?: string;
}

const SearchBar: React.FC<SearchBarProps> = memo(({
  onSearch,
  initialValue = '',
  maxWidth,
  gap,
  inputFontSize,
  inputPadding,
  buttonMinWidth,
  buttonFontSize,
  buttonPadding,
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
      <SearchContainer onSubmit={handleSubmit} maxWidth={maxWidth} gap={gap}>
        <SearchInput
          type="text"
          placeholder="Search for photos..."
          value={query}
          onChange={handleChange}
          aria-label="Search photos"
          fontSize={inputFontSize}
          padding={inputPadding}
        />
        <SearchButton 
          type="submit"
          disabled={!query.trim()}
          aria-label="Submit search"
          minWidth={buttonMinWidth}
          fontSize={buttonFontSize}
          padding={buttonPadding}
        >
          Search
        </SearchButton>
      </SearchContainer>
    </ThemeProvider>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar; 