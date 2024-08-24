import { useState } from 'react';
import { Card } from 'shadcn/card';
import { Label } from 'shadcn/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'shadcn/tabs';
import { BadgeCheck, Check } from 'lucide-react';
import { useBilling } from '@/state/useBilling';
import { formatCurrency } from 'helpers/formatters';

export const OrganizationBilling = ({ user }) => {
  const [interval, setInterval] = useState('month');
  const { paymentPlans } = useBilling();
  if (!paymentPlans) return null;

  return (
    <div>
      <h3 className="my-8 text-center">
        {true ? <span>You are currently on the Free Plan</span> : <span>&nbsp;</span>}
      </h3>
      <Tabs className="mx-auto my-6 w-96" value={interval} onValueChange={setInterval}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="month">Monthly</TabsTrigger>
          <TabsTrigger value="year">Yearly</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 gap-10 text-zinc-800 lg:grid-cols-2 xl:grid-cols-3">
        {paymentPlans.map((plan) => (
          <div
            key={plan.name}
            className="relative flex flex-col items-center max-w-sm p-8 rounded-lg shadow-lg bg-slate-100"
          >
            {false && <BadgeCheck className="absolute w-16 h-16 -right-8 -top-8 fill-green-400" />}
            <div>
              <h2 className="mb-2 text-3xl font-extrabold text-center">{plan.name}</h2>
              <p className="text-center opacity-60">{plan.description || ''}</p>
              <div className="flex flex-col items-center my-8">
                <p className="text-2xl font-extrabold">
                  <span>€{formatCurrency(plan.prices[interval].value)}</span>
                  <span className="">&nbsp;/&nbsp;month</span>
                </p>
                {interval === 'month' ? (
                  <p>or €{formatCurrency(plan.prices.year.value)} per year</p>
                ) : (
                  <p>or €{formatCurrency(plan.prices.month.value)} per month</p>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-1">
              {plan.features.map((feature) => (
                <p key={feature} className="flex items-center text-sm">
                  <Check className="w-4 h-4 mr-2" />
                  <b>{feature}</b>
                </p>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button className="px-4 py-2 border-4 rounded-xl border-violet-400 hover:bg-violet-100">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/*
<div className="relative flex flex-col items-center max-w-sm p-8 border-8 border-orange-200 rounded-lg shadow-lg bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100">
        <BadgeCheck className="absolute w-16 h-16 -right-8 -top-8 fill-green-400" />
        <div>
          <div className="flex justify-center gap-4">
            <p className="mb-2 text-3xl font-extrabold">Pro</p>
          </div>
          <p className="text-center opacity-60">For agencies and businesses</p>
          <p className="text-center opacity-60"></p>
          <div className="flex justify-center gap-4">
            <div className="flex flex-col items-center my-8">
              <p className="text-4xl font-extrabold">$79</p>
              <p className="text-sm opacity-60">/month</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              ></path>
            </svg>
            <b>Trending Dashboard</b>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 ml-1 fill-orange-300"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              ></path>
            </svg>
          </p>
          <p className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              ></path>
            </svg>
            <b>25 Keywords</b>
          </p>
          <p className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              ></path>
            </svg>
            <b>25 Keywords</b>
          </p>
          <p className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              ></path>
            </svg>
            <b>25 Keywords</b>
          </p>
          <p className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              ></path>
            </svg>
            <b>25 Keywords</b>
          </p>
          <p className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              ></path>
            </svg>
            <b>25 Keywords</b>
          </p>
          <p className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              ></path>
            </svg>
            <b>250 Accounts Tracking</b>
          </p>
          <p className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              ></path>
            </svg>
            <b>10 Users</b>
          </p>
          <p className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              ></path>
            </svg>
            <b>Early Beta Features&nbsp;</b>
          </p>
          <p className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              ></path>
            </svg>{' '}
            Premium Support
          </p>
          <div className="flex justify-center mt-8">
            <button className="px-4 py-2 border-4 rounded-xl border-violet-400 hover:bg-violet-100">Get Started</button>
          </div>
        </div>
      </div>
*/
