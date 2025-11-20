import React from 'react';
import { Box, Typography } from '@mui/material';
import ModelMetricsCard, { type ModelMetrics } from '../ModelMetricsCard/ModelMetricsCard';
import GenericChart from '../GenericChart/GenericChart';
import Loader from '../../common/Loader/Loader';
import styles from './ModelComparisonPanel.module.scss';

export interface ModelComparisonData {
  modelName: string;
  response: string;
  metrics: ModelMetrics;
}

interface ModelComparisonPanelProps {
  data: ModelComparisonData[];
  isLoading?: boolean;
}

const mockData = [
  {
    metric: 'Answer relevance',
    Mistral: 0.38,
    Llama: 0.70,
    Gemini: 0.55,
  },
  {
    metric: 'Context relevance',
    Mistral: 0.66,
    Llama: 0.72,
    Gemini: 0.75,
  },
  {
    metric: 'Groundedness',
    Mistral: 0.88,
    Llama: 0.95,
    Gemini: 0.92,
  },
  {
    metric: 'Correctness',
    Mistral: 0.59,
    Llama: 0.72,
    Gemini: 0.53,
  },
  {
    metric: 'Coherence',
    Mistral: 0.60,
    Llama: 0.72,
    Gemini: 0.55,
  },
];

const ModelComparisonPanel: React.FC<ModelComparisonPanelProps> = ({ data, isLoading = false }) => {
  // Prepare data for chart
  const chartData = data.map(model => ({
    model: model.modelName,
    'Latency (ms)': model.metrics.latency,
    'Input Tokens': model.metrics.inputTokens / 100, // Scale down for better visualization
    'Output Tokens': model.metrics.outputTokens / 100, // Scale down for better visualization
    'Cost ($)': model.metrics.totalCost * 1000, // Scale up for better visualization
  }));

  const colors = ['#F2A900', '#D38DBB', '#1E88E5']; 

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <Loader message="Comparing models..." size={40} />
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box className={styles.emptyState}>
        <Typography variant="body2" color="textSecondary">
          Click "Model Comparison" button in the chat to compare model responses
        </Typography>
      </Box>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.modelsSection}>
        {data.map((modelData, index) => (
          <ModelMetricsCard
            key={index}
            modelName={modelData.modelName}
            response={modelData.response}
            metrics={modelData.metrics}
          />
        ))}
      </div>

      <div className={styles.chartSection}>
        <Typography variant="subtitle2" className={styles.chartTitle}>
          Performance Comparison
        </Typography>
        <Box className={styles.chartWrapper}>
           <GenericChart
              data={mockData}
              xKey="metric"
              yKeys={['Mistral', 'Llama', 'Gemini']}
              chartType="bar"
              stacked={false} // grouped bars (side-by-side). set true to stack.
              height={420}
              colors={colors}
              xAxisLabel="Evaluation metric"
              yAxisLabel="Score"
              axisLabelStyle={{ fontSize: 13, fill: '#666', fontWeight: 600 }}
            />
        </Box>
      </div>
    </div>
  );
};

export default ModelComparisonPanel;