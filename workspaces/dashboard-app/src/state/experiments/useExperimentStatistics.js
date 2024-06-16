import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';
const GOALS = ['Conversions', 'Revenue'];

export const useExperimentStatistics = (experiment) => {
  const [currency, setCurrency] = useState(null);
  const [goal, setGoal] = useState('Conversions');
  const [hasBeenSet, setHasBeenSet] = useState(false);
  const statisticsClient = useClient(import.meta.env.VITE_STATISTICS_URL);
  const isRunning = experiment?.status === 'Running';
  const { variants } = experiment;

  const { data: statistics, isLoading: isLoadingMonitor } = useQuery({
    queryKey: ['STATISTICS', experiment.id, goal, currency],
    queryFn: () => statisticsClient.get(`/${experiment.id}/statistics?goal=${goal}&currency=${currency}`),
  });

  const { data: currencies } = useQuery({
    enabled: !!experiment,
    queryKey: ['CURRENCIES', experiment?.id],
    queryFn: () => statisticsClient.get(`${experiment?.id}/currencies`),
  });

  const totalSessions = statistics && Object.values(statistics).reduce((acc, stat) => acc + stat.sessions, 0);

  const original = variants?.find((v) => v.name === 'Original');
  const allPurchases = variants?.map((v) => v.purchases).flat() || [];

  useEffect(() => {
    if (!hasBeenSet && currencies?.length > 0) {
      setHasBeenSet(true);
      setCurrency(currencies[0] !== 'nill' ? currencies[0] : currencies[1] || currencies[0]);
    }
  }, [currencies, hasBeenSet]);

  return {
    GOALS,
    statistics,
    variants,
    original,
    totalSessions,
    currencies,
    currency,
    goal,
    isRunning,
    isLoading: !experiment || !statistics,
    setGoal,
    setCurrency,
  };
};
