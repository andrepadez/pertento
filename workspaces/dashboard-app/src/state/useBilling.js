import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'hooks/useAuth';
import { useClient } from 'hooks/useClient';

export const useBilling = () => {
  const queryClient = useQueryClient();
  const billingClient = useClient(import.meta.env.VITE_PAYMENTS_URL);
  const { user } = useAuth();

  const { data: paymentPlans } = useQuery({
    queryKey: ['PAYMENT_PLANS'],
    enabled: !!user,
    queryFn: async () => billingClient.get(`/stripe/payment-plans/${user.company.type}`),
  });

  const { data: subscription } = useQuery({
    queryKey: ['SUBSCRIPTION'],
    enabled: !!user,
    queryFn: async () => billingClient.get(`/stripe/subscription`),
  });

  const createCheckoutSession = async (priceId) => {
    try {
      const { url } = await billingClient.post('/stripe/checkout-session', { priceId });
      window.location.href = url;
    } catch (ex) {
      console.error(ex);
    }
  };

  return { paymentPlans, subscription, createCheckoutSession };
};
