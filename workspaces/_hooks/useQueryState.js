import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useGlobal } from 'hooks/useGlobal';
import { useDebounce } from 'hooks/useDebounce';

export const useQueryState = (key, defaultValue, isGlobal = false) => {
  const queryClient = useQueryClient();
  const location = useLocation();

  const [value, setValue] = isGlobal
    ? useGlobal(['QUERY_STATE', key], () => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(key) || defaultValue;
      })
    : useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(key) || defaultValue;
      });

  useDebounce(
    () => {
      const searchParams = new URLSearchParams(location.search);
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }

      const globalCache = queryClient
        .getQueryCache()
        .getAll()
        .filter((cache) => cache.queryKey[1] === 'QUERY_STATE')
        .map((cache) => ({ key: cache.queryKey[2], data: cache.state.data }));

      const globalKeys = globalCache.map((cache) => cache.key);
      const globalQuery = globalCache
        .filter((cache) => cache.data !== null)
        .map((cache) => `${cache.key}=${cache.data}`)
        .toSorted()
        .join('&');

      const params = Array.from(searchParams)
        .filter(([key, value]) => !globalKeys.includes(key))
        .sort(([a], [b]) => (a < b ? 1 : a > b ? -1 : 0))
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      const finalQueryString = [globalQuery, params].join('&').replace(/\&$/, '');
      const hash = location.hash;

      const url = `${window.location.pathname}?${finalQueryString}${hash}`;
      window.history.pushState({}, '', url);
    },
    100,
    [key, value, location],
  );

  const reset = () => setValue(defaultValue);
  const clear = () => setValue(null);

  return [value, setValue, reset, clear];
};
