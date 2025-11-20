import React from 'react';
import { Box } from '@mui/material';
import PipelineSection from '../PipelineSection/PipelineSection';
import DocumentSection from '../DocumentSection/DocumentSection';
import styles from './PipelinePanel.module.scss';

interface PipelinePanelProps {
  pipeline: string;
  pipelines: string[];
  onSelect: (val: string) => void;
  onCreatePipeline: () => void;
  documents: string[];
}

const PipelinePanel: React.FC<PipelinePanelProps> = ({
  pipeline,
  pipelines,
  onSelect,
  onCreatePipeline,
  documents
}) => {
  return (
    <Box className={styles.panel}>
      <PipelineSection
        pipeline={pipeline}
        pipelines={pipelines}
        onSelect={onSelect}
        onCreatePipeline={onCreatePipeline}
      />
      <Box className={styles.divider} />
      <DocumentSection documents={documents} />
    </Box>
  );
};

export default PipelinePanel;