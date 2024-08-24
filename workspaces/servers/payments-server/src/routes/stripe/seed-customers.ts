import { Stripe } from 'stripe';
import { db, eq, Companies, Subscriptions } from 'pertentodb';
const { STRIPE_SECRET_KEY } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);

const companies = await db.query.Companies.findMany({
  where: eq(Companies.parentCompanyId, 0),
  with: { users: true },
});

// console.log('companies', companies.length);

for (let company of companies) {
  if (company.users.length === 0) continue;

  const user = company.users.find((u) => u.role === 'Owner');
  if (!user) continue;

  const customer = await stripe.customers.create({
    email: user.email,
    name: company.friendlyName,
  });

  const [subscription] = await db
    .insert(Subscriptions)
    .values({
      companyId: company.id,
      customerId: customer.id,
      email: user.email,
    })
    .returning();

  console.log(subscription);
}
