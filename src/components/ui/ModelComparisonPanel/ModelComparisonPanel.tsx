import React, { useState } from 'react';
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

const metricVsScoreData = [
  {
    metric: 'Answer relevance',
    'Mistral Large 2.0': 0.38,
    'Llama 3.0': 0.70,
    'Gemini 2.5 Flash': 0.55,
  },
  {
    metric: 'Context relevance',
    'Mistral Large 2.0': 0.66,
    'Llama 3.0': 0.72,
    'Gemini 2.5 Flash': 0.75,
  },
  {
    metric: 'Groundedness',
    'Mistral Large 2.0': 0.88,
    'Llama 3.0': 0.95,
    'Gemini 2.5 Flash': 0.92,
  },
  {
    metric: 'Correctness',
    'Mistral Large 2.0': 0.59,
    'Llama 3.0': 0.72,
    'Gemini 2.5 Flash': 0.53,
  },
  {
    metric: 'Coherence',
    'Mistral Large 2.0': 0.60,
    'Llama 3.0': 0.72,
    'Gemini 2.5 Flash': 0.55,
  },
];

const csatScoreData = [
  {
    model: 'Mistral Large 2.0',
    'CSAT Score': 4.0,
  },
  {
    model: 'Llama 3.0',
    'CSAT Score': 8.6,
  },
  {
    model: 'Gemini 2.5 Flash',
    'CSAT Score': 7.3,
  },
];

const ModelComparisonPanel: React.FC<ModelComparisonPanelProps> = ({ data, isLoading = false }) => {
  const [activeChartTab, setActiveChartTab] = useState(0);
  
  const chartTabs = ['Metric vs Score per model', 'CSAT score'];
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
      {/* Model Metrics Cards */}
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

      {/* Chart Section with Tabs */}
      <div className={styles.chartSection}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Model comparison
        </Typography>
        
        {/* Chart Tabs */}
        <div className={styles.chartTabs}>
          {chartTabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.chartTab} ${activeChartTab === index ? styles.activeTab : ''}`}
              onClick={() => setActiveChartTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeChartTab === 0 && (
            <div className={styles.chartContainer}>
              <Typography variant="subtitle1" className={styles.chartHeading}>
                Metric vs Score per model
              </Typography>
              <Typography variant="body2" className={styles.chartSubheading}>
                #Based on all the responses (15)
              </Typography>
              <Box className={styles.chartWrapper}>
                <GenericChart
                  data={metricVsScoreData}
                  xKey="metric"
                  yKeys={['Mistral Large 2.0', 'Llama 3.0', 'Gemini 2.5 Flash']}
                  chartType="bar"
                  stacked={false}
                  height={420}
                  colors={colors}
                  xAxisLabel="Evaluation metric"
                  yAxisLabel="Score"
                  axisLabelStyle={{ fontSize: 13, fill: '#666', fontWeight: 500 }}
                  hideLegend
                />
              </Box>
              <div className={styles.legend}>
                <span className={styles.legendTitle}>Models</span>
                <div className={styles.legendItems}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendColor} style={{ backgroundColor: '#F2A900' }} />
                    <span>Mistral Large 2.0</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendColor} style={{ backgroundColor: '#D38DBB' }} />
                    <span>Llama 3.0</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendColor} style={{ backgroundColor: '#1E88E5' }} />
                    <span>Gemini 2.5 Flash</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeChartTab === 1 && (
            <div className={styles.chartContainer}>
              <Typography variant="subtitle1" className={styles.chartHeading}>
                CSAT score
              </Typography>
              <Typography variant="body2" className={styles.chartSubheading}>
                #Based on all the responses (15)
              </Typography>
              <Box className={styles.chartWrapper}>
                <GenericChart
                  data={csatScoreData}
                  xKey="model"
                  // yKeys={['Mistral Large 2.0', 'Llama 3.0', 'Gemini 2.5 Flash']}
                  yKeys={['CSAT Score']}
                  chartType="bar"
                  stacked={false}
                  height={420}
                  colors={colors}
                  xAxisLabel="AI Models"
                  yAxisLabel="CSAT Score (out of 10)"
                  axisLabelStyle={{ fontSize: 13, fill: '#666', fontWeight: 500 }}
                  hideLegend
                />
              </Box>
              <div className={styles.legend}>
                <span className={styles.legendTitle}>Models</span>
                <div className={styles.legendItems}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendColor} style={{ backgroundColor: '#F2A900' }} />
                    <span>Mistral Large 2.0</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendColor} style={{ backgroundColor: '#D38DBB' }} />
                    <span>Llama 3.0</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendColor} style={{ backgroundColor: '#1E88E5' }} />
                    <span>Gemini 2.5 Flash</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.chartFooter}>
          <Typography variant="caption" className={styles.timestamp}>
            Experiment conducted: Nov 3, 2025 at 11:18 AM
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ModelComparisonPanel;