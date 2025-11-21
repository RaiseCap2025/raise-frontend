/**
 * Error Boundary Component
 * Comprehensive error handling with Sentry integration, logging, and recovery mechanisms
 */

import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { env, isDevelopment } from '../../../config/env';

// ============================================================================
// Types
// ============================================================================

interface Props {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo, resetError: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'page' | 'component';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

// ============================================================================
// Error Boundary Component
// ============================================================================

export class ErrorBoundary extends Component<Props, State> {
  private resetTimeout: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (isDevelopment()) {
      console.error('[Error Boundary] Caught error:', error);
      console.error('[Error Boundary] Error info:', errorInfo);
    }

    // Update state with error info
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Log to Sentry
    this.logErrorToSentry(error, errorInfo);

    // Log to custom analytics service
    this.logErrorToAnalytics(error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Auto-reset after multiple errors (prevent infinite error loops)
    if (this.state.errorCount >= 3) {
      this.scheduleAutoReset();
    }
  }

  componentWillUnmount(): void {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
  }

  /**
   * Log error to Sentry
   */
  private logErrorToSentry(error: Error, errorInfo: ErrorInfo): void {
    if (env.VITE_SENTRY_DSN) {
      Sentry.withScope((scope) => {
        // Add extra context
        scope.setContext('errorInfo', {
          componentStack: errorInfo.componentStack,
        });

        // Set level based on error type
        scope.setLevel(this.getErrorLevel(error));

        // Add tags
        scope.setTag('error_boundary', this.props.level || 'page');
        scope.setTag('error_count', this.state.errorCount);

        // Capture exception
        Sentry.captureException(error);
      });
    }
  }

  /**
   * Log error to custom analytics service
   */
  private logErrorToAnalytics(error: Error, errorInfo: ErrorInfo): void {
    try {
      // Custom analytics logging
      const errorData = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        level: this.props.level || 'page',
        errorCount: this.state.errorCount,
      };

      // Send to your analytics endpoint
      if (typeof window !== 'undefined' && 'fetch' in window) {
        fetch('/api/analytics/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorData),
        }).catch(err => {
          // Silently fail - don't throw errors from error logging
          console.warn('Failed to log error to analytics:', err);
        });
      }
    } catch (loggingError) {
      console.warn('Error while logging to analytics:', loggingError);
    }
  }

  /**
   * Determine error severity level
   */
  private getErrorLevel(error: Error): Sentry.SeverityLevel {
    // Network errors
    if (error.message.includes('Network') || error.message.includes('fetch')) {
      return 'warning';
    }

    // Type errors might indicate bugs
    if (error instanceof TypeError) {
      return 'error';
    }

    // Reference errors are usually bugs
    if (error instanceof ReferenceError) {
      return 'error';
    }

    // Default
    return 'error';
  }

  /**
   * Reset error state
   */
  private resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
      this.resetTimeout = null;
    }
  };

  /**
   * Schedule automatic reset after multiple errors
   */
  private scheduleAutoReset(): void {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }

    // Reset after 30 seconds
    this.resetTimeout = setTimeout(() => {
      this.setState({
        errorCount: 0,
      });
      this.resetError();
    }, 30000);
  }

  /**
   * Reload the page
   */
  private reloadPage = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(
          this.state.error,
          this.state.errorInfo!,
          this.resetError
        );
      }

      // Default fallback UI
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorCount={this.state.errorCount}
          level={this.props.level}
          resetError={this.resetError}
          reloadPage={this.reloadPage}
        />
      );
    }

    return this.props.children;
  }
}

// ============================================================================
// Default Error Fallback UI
// ============================================================================

interface ErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  errorCount: number;
  level?: 'page' | 'component';
  resetError: () => void;
  reloadPage: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  errorCount,
  level = 'page',
  resetError,
  reloadPage,
}) => {
  const isPageLevel = level === 'page';

  return (
    <div
      style={{
        padding: isPageLevel ? '2rem' : '1rem',
        minHeight: isPageLevel ? '100vh' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isPageLevel ? '#f5f5f5' : 'transparent',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Error Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'inline-block' }}
          >
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
            <path d="M12 8v4m0 4h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Title */}
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#1f2937' }}>
          {isPageLevel ? 'Oops! Something went wrong' : 'Component Error'}
        </h2>

        {/* Description */}
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem' }}>
          {errorCount >= 3
            ? 'Multiple errors occurred. The application will automatically reset in 30 seconds.'
            : isPageLevel
            ? 'We encountered an unexpected error. Please try again or reload the page.'
            : 'This component encountered an error. You can try to recover or reload the page.'}
        </p>

        {/* Error Details (Development Only) */}
        {isDevelopment() && (
          <details style={{ marginBottom: '1.5rem' }}>
            <summary
              style={{
                cursor: 'pointer',
                padding: '0.5rem',
                backgroundColor: '#fee2e2',
                borderRadius: '4px',
                color: '#991b1b',
              }}
            >
              Error Details (Development Mode)
            </summary>
            <div
              style={{
                marginTop: '0.5rem',
                padding: '1rem',
                backgroundColor: '#fef2f2',
                borderRadius: '4px',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                overflow: 'auto',
              }}
            >
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Error:</strong> {error.message}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Stack:</strong>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {error.stack}
                </pre>
              </div>
              {errorInfo?.componentStack && (
                <div>
                  <strong>Component Stack:</strong>
                  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          </details>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={resetError}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            Try Again
          </button>
          
          {isPageLevel && (
            <button
              onClick={reloadPage}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              Reload Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// HOC for wrapping components with error boundary
// ============================================================================

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}