import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './ModelMetricsCard.module.scss';

export interface ModelMetrics {
  latency: number; // in ms
  inputTokens: number;
  outputTokens: number;
  totalCost: number; // in dollars
}

interface ModelMetricsCardProps {
  modelName: string;
  response: string;
  metrics: ModelMetrics;
}

const ModelMetricsCard: React.FC<ModelMetricsCardProps> = ({ modelName, response, metrics }) => {
  const formatCost = (cost: number) => `$${cost.toFixed(4)}`;
  const formatLatency = (ms: number) => `${ms.toFixed(0)}ms`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Typography variant="h6" className={styles.modelName}>
          {modelName}
        </Typography>
      </div>

      <div className={styles.responseSection}>
        <Typography variant="body2" className={styles.responseLabel}>
          Response:
        </Typography>
        <Box className={styles.responseText}>
          <Typography variant="body2">{response}</Typography>
        </Box>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricItem}>
          <Typography variant="caption" className={styles.metricLabel}>
            Latency
          </Typography>
          <Typography variant="body2" className={styles.metricValue}>
            {formatLatency(metrics.latency)}
          </Typography>
        </div>

        <div className={styles.metricItem}>
          <Typography variant="caption" className={styles.metricLabel}>
            Input tokens
          </Typography>
          <Typography variant="body2" className={styles.metricValue}>
            {metrics.inputTokens.toLocaleString()}
          </Typography>
        </div>

        <div className={styles.metricItem}>
          <Typography variant="caption" className={styles.metricLabel}>
            Output tokens
          </Typography>
          <Typography variant="body2" className={styles.metricValue}>
            {metrics.outputTokens.toLocaleString()}
          </Typography>
        </div>

        <div className={styles.metricItem}>
          <Typography variant="caption" className={styles.metricLabel}>
            Total cost
          </Typography>
          <Typography variant="body2" className={styles.metricValue}>
            {formatCost(metrics.totalCost)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ModelMetricsCard;