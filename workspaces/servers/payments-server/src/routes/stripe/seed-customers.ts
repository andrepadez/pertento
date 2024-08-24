import { Stripe } from 'stripe';
import { db, and, eq, ne, notInArray, asc, desc, Companies, Users, Subscriptions } from 'pertentodb';
const { STRIPE_SECRET_KEY } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);

// console.log(companies.map((c) => c.users[0]?.email));

const existingCustomers = [];
const limit = 100;
let starting_after = null;
while (true) {
  const filter = starting_after ? { starting_after, limit } : { limit };
  const res = await stripe.customers.list(filter);
  existingCustomers.push(...res.data);
  if (!res.has_more) break;
  starting_after = res.data.at(-1).id;
}

const existingCompanyIds = existingCustomers.map((c) => +c.metadata.companyId);
console.log(existingCompanyIds);

const companies = await db.query.Companies.findMany({
  where: and(
    ne(Companies.id, 1),
    eq(Companies.parentCompanyId, 0),
    // existingCompanyIds.length > 0 ? notInArray(Companies.id, existingCompanyIds) : null,
  ),
  with: {
    users: {
      where: eq(Users.role, 'Owner'),
      limit: 1,
      orderBy: asc(Users.createdAt),
    },
  },
});
console.log(companies.map((c) => c.id));

for (let company of companies) {
  const user = company.users.find((u) => u.role === 'Owner');
  if (!user) continue;
  console.log('inserting customer for', company.friendlyName, user.email);

  const customer = await stripe.customers.create({
    email: user.email,
    name: company.friendlyName,
    metadata: {
      companyId: company.id,
    },
  });

  const [subscription] = await db
    .insert(Subscriptions)
    .values({
      companyId: company.id,
      customerId: customer.id,
      email: user.email,
    })
    .returning();

  console.log(subscription.id, subscription.companyId, subscription.customerId, subscription.email);
}
