import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import { LoadingContainer, LoadingSpinner } from './styled';
import type { LoadingStateProps } from './styled';

/**
 * LoadingState component that displays a loading spinner with customizable styling.
 * 
 * @component
 * @example
 * ```tsx
 * <LoadingState
 *   variant="default"
 *   spinnerSize={48}
 *   spinnerBorderWidth={4}
 *   spinnerColor="#000000"
 * />
 * ```
 */
const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'default',
  minHeight,
  spinnerSize,
  spinnerBorderWidth,
  backgroundColor,
  spinnerColor,
  padding,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingContainer 
        $variant={variant}
        $minHeight={minHeight}
        $backgroundColor={backgroundColor}
        $padding={padding}
      >
        <LoadingSpinner 
          $size={spinnerSize} 
          $borderWidth={spinnerBorderWidth}
          $color={spinnerColor}
        />
      </LoadingContainer>
    </ThemeProvider>
  );
};

export default LoadingState; 