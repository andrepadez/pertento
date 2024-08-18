import { Card } from 'shadcn/card';
import { useBilling } from '@/state/useBilling';

export const OrganizationBilling = ({ user }) => {
  const { paymentPlans } = useBilling();

  if (!paymentPlans) return null;
  const queryString = `prefilled_email=${user.email}&client_reference_id=${user.companyId}`;
  console.log(queryString);
  return (
    <div className="p-5">
      <div className="flex justify-around">
        {paymentPlans.map((plan) => (
          <Card key={plan.name} className="flex flex-col gap-5 p-5">
            <h3>{plan.name}</h3>
            <div className="flex justify-between">
              <div>
                <h4>Monthly</h4>
                <p>${plan.monthly.price}</p>
                <a target="_blank" href={`${plan.monthly.link}?${queryString}`}>
                  Upgrade
                </a>
              </div>
              <div>
                <h4>Yearly</h4>
                <p>${plan.yearly.price}</p>
                <a target="_blank" href={`${plan.yearly.link}?${queryString}`}>
                  Upgrade
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
