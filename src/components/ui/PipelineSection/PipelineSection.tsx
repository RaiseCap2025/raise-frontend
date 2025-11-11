import React from 'react';
import { Box, Typography, Select, MenuItem, Button } from '@mui/material';
import styles from './PipelineSection.module.scss';

interface PipelineSectionProps {
  pipeline: string;
  pipelines: string[];
  onSelect: (val: string) => void;
  onCreatePipeline: () => void;
}

const PipelineSection: React.FC<PipelineSectionProps> = ({
  pipeline,
  pipelines,
  onSelect,
  onCreatePipeline
}) => {
  return (
    <Box className={styles.pipelineSection}>
      <Typography className={styles.panelTitle}>Select data source</Typography>
      <Select
        fullWidth
        value={pipeline}
        onChange={(e) => onSelect(e.target.value)}
        displayEmpty
        className={styles.pipelineSelect}
      >
        <MenuItem value="">Select pipeline</MenuItem>
        {pipelines.map((p, idx) => <MenuItem key={idx} value={p}>{p}</MenuItem>)}
      </Select>
      <Button
        fullWidth
        className={styles.createPipelineBtn}
        onClick={onCreatePipeline}
      >
        Create new data pipeline +
      </Button>
    </Box>
  );
};

export default PipelineSection;
