import { useState, useCallback } from 'react';
import type { ApiStatus } from '../types';

/**
 * Hook for managing API request status
 * @returns Object with status, setStatus, and helper functions
 */
export function useApiStatus() {
  const [status, setStatus] = useState<ApiStatus>('idle');

  // Check if the request is in a specific status
  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  // Helper functions to set the status
  const setIdle = useCallback(() => setStatus('idle'), []);
  const setLoading = useCallback(() => setStatus('loading'), []);
  const setSuccess = useCallback(() => setStatus('success'), []);
  const setError = useCallback(() => setStatus('error'), []);

  return {
    status,
    setStatus,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    setIdle,
    setLoading,
    setSuccess,
    setError,
  };
}

export default useApiStatus;
