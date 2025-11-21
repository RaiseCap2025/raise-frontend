import React from 'react';
import { Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PercentIcon from '@mui/icons-material/Percent';
import styles from './ModelMetricsCard.module.scss';

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
            <div className={styles.iconCircle} style={{ backgroundColor: '#FFE8D6' }}>
              <ChatBubbleOutlineIcon className={styles.summaryIcon} style={{ color: '#F2A900' }} />
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
            <div className={styles.iconCircle} style={{ backgroundColor: '#D6EBFF' }}>
              <PercentIcon className={styles.summaryIcon} style={{ color: '#1976D2' }} />
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" 
                      stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
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