import Stripe from 'stripe';
import { paymentPlans } from 'misc/payment-plans';
const { STRIPE_SECRET_KEY } = process.env;

export const paymentPlansHandler = async (ctx) => {
  const { companyType } = ctx.req.param();
  return ctx.json(paymentPlans[companyType]);
};
