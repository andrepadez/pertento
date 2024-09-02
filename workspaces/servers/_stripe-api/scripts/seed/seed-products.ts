import stripe from 'stripe-api';
import { baseProducts } from './base-products';
import { basePortalConfig } from './base-portal-config';

const companyTypes = Object.keys(baseProducts);

const stripeProducts = [];
const stripePrices = [];

for (let companyType of companyTypes) {
  console.log(companyType);
  for (let baseProduct of baseProducts[companyType]) {
    const productObject = {
      name: baseProduct.name,
      active: true,
      marketing_features: baseProduct.marketing_features,
      metadata: {
        companyType,
        index: baseProduct.index,
      },
    };

    const stripeProduct = await stripe.products.create(productObject);
    stripeProduct.prices = [];

    const priceIntervals = Object.keys(baseProduct.prices);
    for (let interval of priceIntervals) {
      const priceObject = {
        product: stripeProduct.id,
        currency: 'eur',
        billing_scheme: 'per_unit',
        unit_amount: baseProduct.prices[interval].value,
        recurring: { interval },
      };
      const stripePrice = await stripe.prices.create(priceObject);
      stripeProduct.prices.push(stripePrice);
      stripePrices.push(stripePrice);
    }
    stripeProducts.push(stripeProduct);
  }
}

// console.log(stripeProducts.length);

// const { data: stripeProducts } = await stripe.products.list({ active: true });
// const { data: stripePricesOriginal } = await stripe.prices.list({ active: true, limit: 100 });
// const stripePrices = stripePricesOriginal.filter(
//   (price) => !!stripeProducts.find((product) => product.id === price.product),
// );

// console.log(stripePrices.length);

for (let price of stripePrices) {
  const portalConfigObject = structuredClone(basePortalConfig);
  const product = stripeProducts.find((product) => product.id === price.product);
  portalConfigObject.business_profile.headline = `${product.name} (${price.recurring.interval})`;
  const subscription_update = portalConfigObject.features.subscription_update;
  subscription_update.products = [];
  if (price.recurring.interval === 'month') {
    const yearPrice = stripePrices.find((p) => p.product === price.product && p.recurring.interval === 'year');
    subscription_update.products.push({ product: product.id, prices: [yearPrice.id] });
  }
  const upgradeableProducts = stripeProducts.filter(
    (p) => p.metadata.index > product.metadata.index && p.metadata.companyType === product.metadata.companyType,
  );

  for (let upgradeableProduct of upgradeableProducts) {
    const productPrices = stripePrices.filter((p) => p.product === upgradeableProduct.id);
    subscription_update.products.push({
      product: upgradeableProduct.id,
      prices: productPrices.map((p) => p.id),
    });
  }

  if (portalConfigObject.features.subscription_update.products.length === 0) {
    continue;
  }

  console.log(price.id, portalConfigObject.features.subscription_update.products.length);

  portalConfigObject.metadata = {
    priceId: price.id,
  };

  const portalConfig = await stripe.billingPortal.configurations.create(portalConfigObject);
  console.log('portalConfig', portalConfig.id, portalConfig.business_profile.headline, portalConfig.metadata.priceId);
}

process.exit(0);
