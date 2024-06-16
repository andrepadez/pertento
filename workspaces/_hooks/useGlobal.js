import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useGlobal = (key, initialData) => {
  const [hasUpdated, setHasUpdated] = useState();
  const queryClient = useQueryClient();

  const theKey = Array.isArray(key) ? ['USE_GLOBAL', ...key, hasUpdated] : ['USE_GLOBAL', key, hasUpdated];
  const theKeyString = theKey.join('$');
  const theInitialData = typeof initialData === 'function' ? initialData() : initialData;

  const { data } = useQuery({
    queryKey: theKey,
    initialData: theInitialData,
    queryFn: () => theInitialData || null,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const setData = (arg) => {
    const val = typeof arg === 'function' ? arg(data) : arg;
    queryClient.setQueryData(theKey, () => val);
  };

  const reset = (key) => {
    const theKey = Array.isArray(key) ? ['USE_GLOBAL', ...key] : ['USE_GLOBAL', key];
    queryClient.invalidateQueries({ queryKey: theKey });
    queryClient.refetchQueries(theKey);
  };

  const refresh = () => setHasUpdated(Math.random());

  return [data, setData, refresh, reset];
};
