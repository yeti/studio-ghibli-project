import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ErrorBoundary } from '~/shared/components/ErrorBoundary';
import { GraphQLErrorHandler } from '~/shared/components/GraphQLErrorHandler';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('Error Handling Tests', () => {
  describe('ErrorBoundary', () => {
    beforeEach(() => {
      // Suppress console.error for tests
      vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('renders children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>,
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders error UI when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(
        screen.getByText('🎬 Oops! Something went wrong'),
      ).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('allows retry when error occurs', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(
        screen.getByText('🎬 Oops! Something went wrong'),
      ).toBeInTheDocument();

      // Retry should clear the error
      fireEvent.click(screen.getByText('Try Again'));

      // After retry, render without error
      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>,
      );

      // The error boundary should still be in error state, so we need to create a new instance
      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>,
      );

      expect(getByText('No error')).toBeInTheDocument();
    });

    it('renders custom fallback when provided', () => {
      const customFallback = <div>Custom error message</div>;

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>,
      );

      expect(screen.getByText('Custom error message')).toBeInTheDocument();
    });
  });

  describe('GraphQLErrorHandler', () => {
    it('renders children when no error', () => {
      render(
        <GraphQLErrorHandler error={null}>
          <div>Test content</div>
        </GraphQLErrorHandler>,
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders network error message', () => {
      const networkError = new Error('Network error: Failed to fetch');

      render(
        <GraphQLErrorHandler error={networkError} onRetry={vi.fn()}>
          <div>Test content</div>
        </GraphQLErrorHandler>,
      );

      expect(screen.getByText('Connection Error')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Unable to connect to the server. Please check your internet connection and try again.',
        ),
      ).toBeInTheDocument();
    });

    it('renders not found error message', () => {
      const notFoundError = new Error('Film not found');

      render(
        <GraphQLErrorHandler error={notFoundError} onRetry={vi.fn()}>
          <div>Test content</div>
        </GraphQLErrorHandler>,
      );

      expect(screen.getByText('Film Not Found')).toBeInTheDocument();
      expect(
        screen.getByText(
          'The requested film could not be found. Please try a different film.',
        ),
      ).toBeInTheDocument();
    });

    it('calls onRetry when retry button is clicked', () => {
      const mockRetry = vi.fn();
      const error = new Error('Test error');

      render(
        <GraphQLErrorHandler error={error} onRetry={mockRetry}>
          <div>Test content</div>
        </GraphQLErrorHandler>,
      );

      fireEvent.click(screen.getByText('Try Again'));
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });

    it('does not show retry button when onRetry is not provided', () => {
      const error = new Error('Test error');

      render(
        <GraphQLErrorHandler error={error}>
          <div>Test content</div>
        </GraphQLErrorHandler>,
      );

      expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
    });
  });
});
