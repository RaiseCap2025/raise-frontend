import React from 'react';
import { Typography } from '@mui/material';
import styles from './ModelMetricsCard.module.scss';
import conversationIcon from '../../../assets/conversation-icon.svg';
import PercentIcon from '../../../assets/PercentIcon.svg';
import Llama from '../../../assets/llama.svg';

export interface ModelMetrics {
  latency: number; // in ms
  inputTokens: number;
  outputTokens: number;
  totalCost: number; // in dollars
  totalConversations?: number;
  successRate?: number;
}

interface ModelMetricsCardProps {
  modelName: string;
  response: string;
  metrics: ModelMetrics;
  isRecommended?: boolean;
  recommendationReason?: string;
}

const ModelMetricsCard: React.FC<ModelMetricsCardProps> = ({ 
  modelName,
  metrics,
  recommendationReason = ''
}) => {

  return (
    <div className={styles.card}>
      {/* Summary Metrics Section */}
      <div className={styles.summarySection}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Summary metrics
        </Typography>
        
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <div className={styles.iconCircle}>
              <img src={conversationIcon} alt='conversationIcon' />
            </div>
            <div className={styles.summaryContent}>
              <Typography variant="h4" className={styles.summaryValue}>
                {metrics.totalConversations || 15}
              </Typography>
              <Typography variant="body2" className={styles.summaryLabel}>
                Total conversations
              </Typography>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.iconCircle}>
            <img src={PercentIcon} alt='PercentIcon' />
            </div>
            <div className={styles.summaryContent}>
              <Typography variant="h4" className={styles.summaryValue}>
                {metrics.successRate?.toFixed(2) || '5.88'}
              </Typography>
              <Typography variant="body2" className={styles.summaryLabel}>
                Success rate (%)
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Model Section */}
      <div className={styles.recommendedSection}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Recommended model
        </Typography>
        
        <div className={styles.recommendedCard}>
          <div className={styles.modelHeader}>
            <div className={styles.modelIcon}>
            <img src={Llama} alt='Llama' />
            </div>
            <div className={styles.modelInfo}>
              <Typography variant="body2" className={styles.modelSubtext}>
                Based on overall aggregated performance across all questions.
              </Typography>
              <Typography variant="h5" className={styles.modelNameLarge}>
                {modelName}
              </Typography>
            </div>
          </div>
          
          <Typography variant="body1" className={styles.recommendationText}>
            {recommendationReason || 
             `${modelName.split(' ')[0]} – Highest average CSAT score and best response quality. After analyzing normalized scores and customer feedback, ${modelName.split(' ')[0]} outperformed other models in this experiment.`}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ModelMetricsCard;