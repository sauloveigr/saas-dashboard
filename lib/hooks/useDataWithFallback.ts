import { UseQueryResult } from "@tanstack/react-query";

/**
 * Hook to enhance query results with fallback awareness
 * Helps components handle both real API data and mock fallback data seamlessly
 */

export interface DataWithFallbackOptions<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  isEmpty: boolean;
}

export function useDataWithFallback<T>(
  queryResult: UseQueryResult<T, Error>,
  isEmptyCheck?: (data: T) => boolean
): DataWithFallbackOptions<T> {
  const { data, isLoading, error } = queryResult;

  const isEmpty = data
    ? isEmptyCheck
      ? isEmptyCheck(data)
      : Array.isArray(data) && data.length === 0
    : true;

  return {
    data,
    isLoading,
    error,
    isEmpty,
  };
}
