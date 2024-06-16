import { ResponsiveContainer, Legend } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
const COLORS = ['#82ca9d', '#8884d8', '#ffc658'];

export const ExperimentAreaChart = ({ data, categories, goal }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width="100%" data={data}>
        <defs>
          {categories.map((category, idx) => (
            <linearGradient key={idx} id={`color${idx}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS[idx]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS[idx]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis
          className="text-xs"
          tickFormatter={(value) => {
            if (goal === 'Conversions') return formatNumber(value);
            return formatNumber(value / 1_000) + 'K';
          }}
        />
        <Tooltip />
        {categories.map((category, idx) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            activeDot={{ stroke: COLORS[idx], strokeWidth: 2 }}
            stackId={idx}
            stroke={COLORS[idx]}
            fillOpacity={1}
            fill={`url(#color${idx})`}
          />
        ))}
        <Legend />
        <XAxis angle={0} className="text-xs" dataKey="date" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const formatNumber = (value) => {
  const locale = navigator.language || navigator.languages[0];
  const formatter = new Intl.NumberFormat(locale);
  return formatter.format(value || 0);
};
