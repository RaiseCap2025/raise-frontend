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
  height?: number;
  colors?: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  axisLabelStyle?: {
    fontSize?: number;
    fill?: string;
    fontWeight?: number | string;
  };
}

const GenericChart: React.FC<GenericChartProps> = ({
  data,
  xKey,
  yKeys,
  chartType = 'line',
  height = 400,
  colors = [],
  xAxisLabel = '',
  yAxisLabel = '',
  axisLabelStyle = { fontSize: 14, fill: '#333', fontWeight: 'bold' },
}) => {
  const getColor = (index: number) =>
    colors[index] || `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      {chartType === 'bar' ? (
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey={xKey}
            label={{
              value: xAxisLabel,
              position: 'insideBottom',
              offset: -5,
              ...axisLabelStyle,
            }}
          />
          <YAxis
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              ...axisLabelStyle,
            }}
          />
          <Tooltip />
          <Legend />
          {yKeys.map((key, idx) => (
            <Bar key={key} dataKey={key} fill={getColor(idx)} stackId="a" />
          ))}
        </BarChart>
      ) : (
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey={xKey}
            label={{
              value: xAxisLabel,
              position: 'insideBottom',
              offset: -5,
              ...axisLabelStyle,
            }}
          />
          <YAxis
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              ...axisLabelStyle,
            }}
          />
          <Tooltip />
          <Legend />
          {yKeys.map((key, idx) => (
            <Line
              key={key}
              type={chartType === 'stackedLine' ? 'basis' : 'monotone'}
              dataKey={key}
              stroke={getColor(idx)}
            />
          ))}
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default GenericChart;