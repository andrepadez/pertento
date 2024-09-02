import Stripe from 'stripe';
const { BUILD_ENV, STRIPE_SECRET_KEY } = process.env;
const isDev = BUILD_ENV !== 'production';

const stripe = Stripe(STRIPE_SECRET_KEY);

const { data: products } = await stripe.products.list({ active: true, limit: 100 });
const { data: prices } = await stripe.prices.list({ active: true, limit: 100 });

const paymentLinks = await stripe.paymentLinks.list();

const fetchedPaymentPlans = products.map((product) => {
  const { id, name, metadata } = product;
  const { companyType } = metadata;
  const productPrices = prices
    .filter((price) => price.product === id)
    .reduce((acc, price) => {
      const { interval } = price.recurring;
      acc[interval] = { id: price.id, value: price.unit_amount };
      return acc;
    }, {});

  return { id, name, companyType, prices: productPrices };
});

// console.info(fetchedPaymentPlans, { depth: null });

export const paymentPlans = {
  Agency: [
    {
      id: 'prod_Qj40USG6Qhq2XW',
      name: 'Subscription Test Daily',
      features: ['Trending Dashboard', '10 Keywords', '100 Accounts Tracking', '3 Users'],
      companyType: 'Agency',
      prices: {
        month: {
          id: 'price_1PrbsG009aFOms2RBaXuPZ6P',
          value: 1000,
        },
        year: {
          id: 'price_1PrbsG009aFOms2RBaXuPZ6P',
          value: 1000,
        },
      },
    },
    {
      id: 'prod_Qhvau56mOCOX95',
      name: 'Agency Starter',
      features: ['Trending Dashboard', '10 Keywords', '100 Accounts Tracking', '3 Users'],
      prices: {
        year: {
          id: 'price_1PqVkQ009aFOms2RsMqFk7m9',
          value: 299900,
        },
        month: {
          id: 'price_1PqVja009aFOms2Rh6KIfc6T',
          value: 29900,
        },
      },
    },
    {
      id: 'prod_Qhw89PtPzonlTr',
      name: 'Agency Standard',
      features: ['Trending Dashboard', '10 Keywords', '100 Accounts Tracking', '3 Users'],
      prices: {
        year: {
          id: 'price_1PqWHY009aFOms2R2Hwhjqie',
          value: 499900,
        },
        month: {
          id: 'price_1PqWGh009aFOms2Rf1MWyFTT',
          value: 49900,
        },
      },
    },
    {
      id: 'prod_QhwA5yYbfhXra6',
      name: 'Agency Pro',
      features: ['Trending Dashboard', '10 Keywords', '100 Accounts Tracking', '3 Users'],
      prices: {
        year: {
          id: 'price_1PqWJm009aFOms2RLV1r7nJL',
          value: 699900,
        },
        month: {
          id: 'price_1PqWIW009aFOms2Rk4V3eoWP',
          value: 69900,
        },
      },
    },
  ],
  'Client Account': [
    {
      id: 'prod_QhuVo0yZI72RJw',
      name: 'Pertento Starter',
      features: ['Trending Dashboard', '10 Keywords', '100 Accounts Tracking', '3 Users'],
      prices: {
        year: {
          id: 'price_1PqUgK009aFOms2R8cKHXjVk',
          value: 99900,
        },
        month: {
          id: 'price_1PqUg2009aFOms2RrsL9L3Lo',
          value: 9900,
        },
      },
    },
    {
      id: 'prod_QhudiAXBm5r9Es',
      name: 'Pertento Standard',
      features: ['Trending Dashboard', '10 Keywords', '100 Accounts Tracking', '3 Users'],
      prices: {
        year: {
          id: 'price_1PqUoI009aFOms2RsXhws9h2',
          value: 149900,
        },
        month: {
          id: 'price_1PqUnk009aFOms2RAYK4UxOy',
          value: 14900,
        },
      },
    },
    {
      id: 'prod_QhufkyvOcVWyI9',
      name: 'Pertento Pro',
      features: ['Trending Dashboard', '10 Keywords', '100 Accounts Tracking', '3 Users'],
      prices: {
        year: {
          id: 'price_1PqUqc009aFOms2RaBvPVEou',
          value: 249900,
        },
        month: {
          id: 'price_1PqUqI009aFOms2RtoiDB3dY',
          value: 24900,
        },
      },
    },
  ],
};
