import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Line,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface GenericChartProps {
  data: any[];
  xKey: string;
  yKeys: string[];
  chartType?: 'line' | 'stackedLine' | 'bar';
  stacked?: boolean; // new: control stacking for bar charts
  height?: number;
  colors?: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  axisLabelStyle?: {
    fontSize?: number;
    fill?: string;
    fontWeight?: number | string;
  };
  hideLegend?: boolean;
}

const GenericChart: React.FC<GenericChartProps> = ({
  data,
  xKey,
  yKeys,
  chartType = 'line',
  stacked = false,
  height = 400,
  colors = [],
  xAxisLabel = '',
  yAxisLabel = '',
  axisLabelStyle = { fontSize: 14, fill: '#333', fontWeight: 'bold' },
  hideLegend = false,
}) => {
  const getColor = (index: number) =>
    colors[index] || `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      {chartType === 'bar' ? (
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 40, left: 0 }}
          barCategoryGap="40%"
          barGap={2}
        >
          <CartesianGrid stroke="#eee" />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12 }}
            label={{
              value: xAxisLabel,
              position: 'insideBottom',
              offset: -10,
              ...axisLabelStyle,
            }}
          />
          <YAxis
            domain={[0, 1]}
            tick={{ fontSize: 12 }}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              ...axisLabelStyle,
            }}
          />
          <Tooltip />
          {!hideLegend && (<Legend verticalAlign="bottom" height={1} />)}
          {yKeys.map((key, idx) => (
            <Bar
              key={key}
              dataKey={key}
              fill={getColor(idx)}
              // only stack if stacked === true
              {...(stacked ? { stackId: 'a' } : {})}
              barSize={30}
            />
          ))}
        </BarChart>
      ) : (
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 0 }}>
          <CartesianGrid stroke="#eee" />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12 }}
            label={{
              value: xAxisLabel,
              position: 'insideBottom',
              offset: -10,
              ...axisLabelStyle,
            }}
          />
          <YAxis
            domain={[0, 1]}
            tick={{ fontSize: 12 }}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              ...axisLabelStyle,
            }}
          />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          {yKeys.map((key, idx) => (
            <Line
              key={key}
              type={chartType === 'stackedLine' ? 'basis' : 'monotone'}
              dataKey={key}
              stroke={getColor(idx)}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default GenericChart;