// src/pages/DataPreparation/components/FileSourceSelector.tsx

import React from 'react';
import { Box, Radio, IconButton, Tooltip } from '@mui/material';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import type { FileSourceType, FileSourceOption } from '../../../types/dataPreparation';
import styles from './FileSourceSelector.module.scss';

interface FileSourceSelectorProps {
  value: FileSourceType;
  onChange: (value: FileSourceType) => void;
  error?: string;
}

const FileSourceSelector: React.FC<FileSourceSelectorProps> = ({ value, onChange, error }) => {
  const options: FileSourceOption[] = [
    {
      value: 'upload',
      label: 'Upload file',
      icon: <UploadFileOutlinedIcon />,
      description: 'Upload files from your computer'
    },
    {
      value: 'cloud',
      label: 'Cloud storage',
      icon: <CloudOutlinedIcon />,
      description: 'Connect to cloud storage services'
    },
    {
      value: 'database',
      label: 'Database',
      icon: <StorageOutlinedIcon />,
      description: 'Connect to database sources'
    }
  ];

  return (
    <Box className={styles.container}>
      <Box className={styles.labelContainer}>
        <label className={styles.label}>
          Select file source type<span className={styles.required}>*</span>
        </label>
        <Tooltip title="Choose where your data will come from" arrow>
          <IconButton size="small" className={styles.helpIcon}>
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box className={styles.optionsGrid}>
        {options.map((option) => (
          <Tooltip key={option.value} title={option.description || ''} arrow placement="top">
            <Box
              className={`${styles.optionCard} ${value === option.value ? styles.selected : ''}`}
              onClick={() => onChange(option.value)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(option.value);
                }
              }}
            >
              <Radio
                checked={value === option.value}
                value={option.value}
                className={styles.radio}
                sx={{
                  padding: 0,
                  '&.Mui-checked': {
                    color: '#1976d2'
                  }
                }}
              />
              <span className={styles.optionLabel}>{option.label}</span>
              <span className={styles.optionIcon}>{option.icon}</span>
            </Box>
          </Tooltip>
        ))}
      </Box>

      {error && <span className={styles.error}>{error}</span>}
    </Box>
  );
};

export default FileSourceSelector;