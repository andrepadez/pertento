import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useGlobal } from 'hooks/useGlobal';
import { useDebounce } from 'hooks/useDebounce';

export const useQueryState = (key, defaultValue, isGlobal = false) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const currentLocation = useGlobal('LOCATION', location, true);

  useDebounce(
    () => {
      if (location.pathname !== currentLocation.pathname) {
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

        const url = `${window.location.pathname}?${globalQuery}`;
        window.history.pushState({}, '', url);
      }
    },
    100,
    [location],
  );

  const [value, setValue] = isGlobal
    ? useGlobal(['QUERY_STATE', key], () => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(key) || defaultValue;
      })
    : useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(key) || defaultValue;
      });

  const setTheValue = (newValue) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (newValue) {
      searchParams.set(key, newValue);
    } else {
      searchParams.delete(key);
    }

    const url = `${window.location.pathname}?${searchParams.toString()}${window.location.hash}`;
    window.history.pushState({}, '', url);
    setValue(newValue);
  };

  const reset = () => setTheValue(defaultValue);
  const clear = () => setTheValue(null);

  return [value, setTheValue, reset, clear];
};
