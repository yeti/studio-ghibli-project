import { useState, useCallback } from 'react';

interface UseGraphQLErrorReturn {
  error: Error | null;
  setError: (error: Error | null) => void;
  clearError: () => void;
  retryCount: number;
  retry: () => void;
  maxRetries: number;
}

export const useGraphQLError = (
  maxRetries: number = 3,
): UseGraphQLErrorReturn => {
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
  }, []);

  const retry = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1);
      setError(null);
    }
  }, [retryCount, maxRetries]);

  return {
    error,
    setError,
    clearError,
    retryCount,
    retry,
    maxRetries,
  };
};
