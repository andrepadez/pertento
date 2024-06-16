import { Card } from 'shadcn/card';
import { Select } from 'components/Select';

export const Selectors = ({ manager }) => {
  const { GOALS, goal, setGoal, currencies, currency, setCurrency } = manager;

  if (!currencies) return null;

  return (
    <div className="flex items-center gap-10">
      <h3>Metrics: </h3>
      <div className="grid w-48 gap-2">
        {/* <label className="font-bold">Select Goal</label> */}
        <Select options={GOALS} value={goal} onValueChange={setGoal} />
      </div>
      {goal === 'Revenue' ? (
        <div className="grid w-48 gap-2">
          {/* <label className="font-bold">Select Currency</label> */}
          <Select options={currencies} value={currency} onValueChange={setCurrency} />
        </div>
      ) : (
        <div className="grid w-48 gap-2"></div>
      )}
    </div>
  );
};
