import React from 'react';
import { Card } from 'shadcn/card';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from 'shadcn/table';

export const ExperimentSummaryTable = ({ experiment }) => {
  const { stats, variants } = experiment;
  const currencies = Array.from(new Set(stats.map((stat) => stat.currencyCode)));

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead></TableHead>
            {variants.map((variant) => (
              <TableHead key={variant.id}>
                <span className="font-bold">
                  {variant.name} ({(variant.weight / 100).toFixed(2)}%)
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TitleCell experiment={experiment} title="Sessions" />
            <TableCell></TableCell>
            {variants.map((variant) => (
              <TableCell key={variant.id}>{variant.visitorCount?.count || 0}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TitleCell experiment={experiment} title="Conversions" />
            <CurrencyCell currencies={currencies} />
            {variants.map((variant) => {
              return (
                <ValueCell
                  key={variant.id}
                  currencies={currencies}
                  variant={variant}
                  stats={stats}
                  field="conversions"
                />
              );
            })}
          </TableRow>
          <TableRow>
            <TitleCell experiment={experiment} title="Revenue" />
            <CurrencyCell currencies={currencies} />
            {variants.map((variant) => (
              <ValueCell
                key={variant.id}
                variant={variant}
                currencies={currencies}
                stats={stats}
                field="revenue"
                isCurrency
              />
            ))}
          </TableRow>
          {/* <TableRow>
            <TitleCell experiment={experiment} title="Tax" />
            <CurrencyCell experiment={experiment} />
            {experiment.variants.map((variant) => (
              <ValueCell
                key={variant.id}
                variant={variant}
                currencies={currencies}
                field="tax"
                isCurrency
              />
            ))}
          </TableRow> */}
        </TableBody>
      </Table>
    </Card>
  );
};

const ValueCell = ({ variant, stats, currencies, field, isCurrency }) => {
  return (
    <TableCell className="">
      <div className="grid gap-1">
        {currencies.map((currency) => {
          const stat = stats.find(
            (stat) => stat.currencyCode === currency && stat.variantId === variant.id,
          );
          const value = stat?.[field] || 0;
          return <div key={currency}>{isCurrency ? (value / 100).toFixed(2) : value}</div>;
        })}
      </div>
    </TableCell>
  );
};

const CurrencyCell = ({ currencies }) => {
  return (
    <TableCell>
      <div className="grid gap-1">
        {currencies.map((currency) => (
          <div key={currency}>{currency === 'nill' ? 'N/A' : currency || ''}</div>
        ))}
      </div>
    </TableCell>
  );
};

const TitleCell = ({ experiment, title }) => {
  return (
    <TableCell className="text-right w-[50%]">
      <div className="flex items-center justify-around w-full">
        <div className="text-lg font-bold">{title}</div>
      </div>
    </TableCell>
  );
};
