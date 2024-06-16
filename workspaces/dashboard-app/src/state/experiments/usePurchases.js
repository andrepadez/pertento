import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';

export const usePurchases = (experimentId) => {
  const [currency, setCurrency] = useState('');
  const [goal, setGoal] = useState('Revenue');
  const [hasBeenSet, setHasBeenSet] = useState(false);
  const apiClient = useClient();

  const { data: purchases } = useQuery({
    queryKey: ['EXPERIMENT_PURCHASES', experimentId],
    queryFn: () => apiClient.get(`/experiments/monitor/purchases/${experimentId}`),
  });

  const currencies = purchases
    ? Array.from(
        purchases.reduce((acc, purchase) => {
          acc.add(purchase.currencyCode);
          return acc;
        }, new Set()),
      )
    : null;

  useEffect(() => {
    if (!hasBeenSet && currencies && !currencies?.includes(currency)) {
      setHasBeenSet(true);
      setCurrency(currencies[0]);
    }
  }, [currencies, hasBeenSet]);

  const purchasesByCurrency = purchases?.filter((purchase) => purchase.currencyCode === currency);

  return {
    purchases: goal === 'Revenue' ? purchasesByCurrency : purchases,
    currencies,
    currency,
    setCurrency,
    goal,
    setGoal,
  };
};
