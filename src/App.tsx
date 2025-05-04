import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { theme } from './styles';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingState from './components/LoadingState';
import { LoadingContainer } from './styles/components/app.styles';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const PhotoDetails = lazy(() => import('./pages/PhotoDetails'));

// Function to filter styled-component props
const shouldForwardProp = (prop: string) => !prop.startsWith('$');

const App: React.FC = () => {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Router>
            <Suspense 
              fallback={
                <LoadingContainer>
                  <LoadingState />
                </LoadingContainer>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/photo/:id" element={<PhotoDetails />} />
              </Routes>
            </Suspense>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
