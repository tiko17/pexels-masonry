import { ReactNode } from 'react';
import { BaseStyledProps } from './theme';

export interface ErrorBoundaryProps {
  children: ReactNode;
  customMessage?: string;
  customTitle?: string;
}

export interface ErrorContainerProps extends BaseStyledProps {
  minHeight?: string;
  padding?: string;
}

export interface ErrorMessageProps extends BaseStyledProps {
  fontSize?: {
    title?: string;
    message?: string;
  };
  color?: {
    title?: string;
    message?: string;
  };
}

export interface ReloadButtonProps extends BaseStyledProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
} 