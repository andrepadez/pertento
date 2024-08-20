const { BUILD_ENV } = process.env;
const isDev = BUILD_ENV !== 'production';

export const paymentPlans = [
  {
    name: 'Pertento Subscription Starter',
    yearly: {
      link: isDev ? 'https://buy.stripe.com/test_dR66rje9Aabt316002' : '',
      priceId: isDev ? 'price_1PltoN009aFOms2R9J2aHlcq' : '',
      price: 999,
    },
    monthly: {
      link: isDev ? 'https://buy.stripe.com/test_28oaHz5D4fvNcBG3cf' : '',
      priceId: isDev ? 'price_1Pltng009aFOms2RCVhpbr0D' : '',
      price: 99,
    },
  },
  {
    name: 'Pertento Subscription Pro',
    yearly: {
      link: isDev ? 'https://buy.stripe.com/test_bIY5nfe9A5VdeJObII' : '',
      priceId: isDev ? 'price_1Pltpl009aFOms2RvBgVp4tr' : '',
      price: 2499,
    },
    monthly: {
      link: isDev ? 'https://buy.stripe.com/test_28o3f78Pg83l0SYbIJ' : '',
      priceId: isDev ? 'price_1PltpL009aFOms2RSYmAPGIH' : '',
      price: 249,
    },
  },
];

export const paymentPlansByPriceId = {
  price_1PltoN009aFOms2R9J2aHlcq: { name: paymentPlans[0].name, frequency: 'yearly', price: 999 },
  price_1Pltng009aFOms2RCVhpbr0D: { name: paymentPlans[0].name, frequency: 'monthly', price: 99 },
  price_1Pltpl009aFOms2RvBgVp4tr: { name: paymentPlans[1].name, frequency: 'yearly', price: 2499 },
  price_1PltpL009aFOms2RSYmAPGIH: { name: paymentPlans[1].name, frequency: 'monthly', price: 249 },
};

export const paymentPlansNames = paymentPlans.map((plan) => plan.name);
