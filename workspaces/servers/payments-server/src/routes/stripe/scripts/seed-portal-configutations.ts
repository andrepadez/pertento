import { Stripe } from 'stripe';
import { paymentPlans } from 'misc/payment-plans';
import object from './object.json';
const { STRIPE_SECRET_KEY, VITE_DASHBOARD_URL } = process.env;

const stripe = new Stripe(STRIPE_SECRET_KEY);

// const portalConfig = await stripe.billingPortal.configurations.create(object);
// console.log(portalConfig);

// process.exit(0);

const { data: products } = await stripe.products.list({ active: true });

const { data: portalConfigurations } = await stripe.billingPortal.configurations.list({
  active: true,
  is_default: true,
});

// console.log(portalConfigurations.length);
// // console.log(portalConfigurations.at(0));
// // console.log(portalConfigurations.map((p) => ({ id: p.id, headline: p.business_profile?.headline })));

// for (let portalConfiguration of portalConfigurations) {
//   console.log(portalConfiguration);
//   console.log(portalConfiguration.id, portalConfiguration.business_profile?.headline, portalConfiguration.active);
//   // await stripe.billingPortal.configurations.update(portalConfiguration.id, {
//   //   active: false,
//   // });
// }

// process.exit(0);

for (let product of products) {
  const { id, name, amount, interval, currency, trialPeriodDays, metadata } = product;
  console.log(id, name, metadata.companyType);

  const configuration = structuredClone(object);
  configuration.default_return_url = `${VITE_DASHBOARD_URL}/organization?screen=billing`;
  configuration.business_profile.headline = name;

  const portalConfig = await stripe.billingPortal.configurations.create(configuration);
}

// // console.log(paymentPlans);
