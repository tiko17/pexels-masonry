import React, { Component, ErrorInfo } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import {
  ErrorContainer,
  ErrorMessage,
  ReloadButton,
  ErrorBoundaryProps
} from './styled';

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in its child component tree.
 * It displays a fallback UI instead of the component tree that crashed.
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary customTitle="Oops!" customMessage="Something went wrong">
 *   <App />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    const { children, customTitle, customMessage } = this.props;
    
    if (this.state.hasError) {
      return (
        <ThemeProvider theme={theme}>
          <ErrorContainer>
            <ErrorMessage
              fontSize={{
                title: '2rem',
                message: '1.1rem'
              }}
              color={{
                title: theme.colors.text.primary,
                message: theme.colors.text.secondary
              }}
            >
              <h2>{customTitle || 'Oops! Something went wrong'}</h2>
              <p>
                {customMessage || this.state.error?.message || 'An unexpected error occurred'}
              </p>
            </ErrorMessage>
            <ReloadButton
              onClick={this.handleReload}
              variant="primary"
              size="medium"
            >
              Reload Page
            </ReloadButton>
          </ErrorContainer>
        </ThemeProvider>
      );
    }

    return children;
  }
}

export default ErrorBoundary; 