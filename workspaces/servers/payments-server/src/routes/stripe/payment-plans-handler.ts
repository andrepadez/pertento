import stripe from 'stripe-api';

const paymentPlansPromise = await updatePaymentPlans();

export const paymentPlansHandler = async (ctx) => {
  const { companyType } = ctx.req.param();
  const paymentPlans = await paymentPlansPromise;
  return ctx.json(paymentPlans[companyType]);
};

async function updatePaymentPlans() {
  const { data: stripeProducts } = await stripe.products.list({ active: true });
  const { data: stripePricesOriginal } = await stripe.prices.list({ active: true, limit: 100 });
  const { data: portalConfigurations } = await stripe.billingPortal.configurations.list();
  const stripePrices = stripePricesOriginal.filter(
    (price) => !!stripeProducts.find((product) => product.id === price.product),
  );

  const paymentPlans = stripeProducts.reduce((acc, stripeProduct) => {
    const { companyType } = stripeProduct.metadata;
    acc[companyType] = acc[companyType] || [];
    const { id: productId, name, marketing_features: features } = stripeProduct;
    const product = { productId, name, features: features.map((f) => f.name) };
    acc[companyType].push(product);
    const yearPrice = stripePrices.find((p) => p.product === productId && p.recurring.interval === 'year');
    const monthPrice = stripePrices.find((p) => p.product === productId && p.recurring.interval === 'month');

    product.prices = acc[companyType].prices || {
      year: {
        id: yearPrice.id,
        value: yearPrice.unit_amount,
      },
      month: {
        id: monthPrice.id,
        value: monthPrice.unit_amount,
      },
    };

    return acc;
  }, {});

  return paymentPlans;
}

updatePaymentPlans();
