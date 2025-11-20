// src/pages/DataPreparation/DataPreparation.tsx

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PipelineForm from '../../components/ui/PipelineForm/PipelineForm';
import type { PipelineFormData } from '../../types/dataPreparation';
import styles from './DataPreparation.module.scss';
import PipelineCard from '../../components/ui/PipelineCard/PipelineCard';

const DataPreparation: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: PipelineFormData) => {
    console.log('Form submitted:', data);
    // TODO: Handle form submission
    // Navigate to next step or save data
    alert(`Pipeline created: ${data.pipelineName} with source: ${data.sourceType}`);
  };

  const handleBack = () => {
    navigate('/application');
  };

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.contentWrapper}>
        <Typography className={styles.pageTitle}>
          Application
        </Typography>

        <Box className={styles.formWrapper}>
          <Typography className={styles.formTitle}>
            Create new data pipeline
          </Typography>

          <PipelineCard>
            <Box className={styles.formCard}>
              <PipelineForm onSubmit={handleSubmit} onBack={handleBack} />
            </Box>
          </PipelineCard>
        </Box>
      </Box>
    </Box>
  );
};

export default DataPreparation;