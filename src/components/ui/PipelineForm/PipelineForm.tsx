// src/pages/DataPreparation/components/PipelineForm.tsx

import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FileSourceSelector from '../FileSourceSelector/FileSourceSelector';
import type { PipelineFormData, FileSourceType, FormErrors } from '../../../types/dataPreparation';
import styles from './PipelineForm.module.scss';
import MultiFileUploadForm from '../MultiFileUploadForm/MultiFileUploadForm';

interface PipelineFormProps {
  onSubmit: (data: PipelineFormData) => void;
  onBack: () => void;
}

const PipelineForm: React.FC<PipelineFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<PipelineFormData>({
    pipelineName: '',
    sourceType: null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.pipelineName.trim()) {
      newErrors.pipelineName = 'Pipeline name is required';
    } else if (formData.pipelineName.length < 3) {
      newErrors.pipelineName = 'Pipeline name must be at least 3 characters';
    }

    if (!formData.sourceType) {
      newErrors.sourceType = 'Please select a file source type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePipelineNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, pipelineName: value });
    
    if (touched.pipelineName && errors.pipelineName) {
      const newErrors = { ...errors };
      delete newErrors.pipelineName;
      setErrors(newErrors);
    }
  };

  const handleSourceTypeChange = (value: FileSourceType) => {
    setFormData({ ...formData, sourceType: value });
    
    if (touched.sourceType && errors.sourceType) {
      const newErrors = { ...errors };
      delete newErrors.sourceType;
      setErrors(newErrors);
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = () => {
    setTouched({ pipelineName: true, sourceType: true });
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isNextDisabled = !formData.pipelineName.trim() || !formData.sourceType;

  return (
    <Box className={styles.formContainer}>
      <Box className={styles.formContent}>
        {/* Pipeline Name Input */}
        <Box className={styles.inputWrapper}>
          <TextField
            id="pipeline-name"
            fullWidth
            label="Enter new data pipeline name*"
            value={formData.pipelineName}
            onChange={handlePipelineNameChange}
            onBlur={() => handleBlur('pipelineName')}
            error={touched.pipelineName && !!errors.pipelineName}
            helperText={touched.pipelineName && errors.pipelineName}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                fontSize: '15px',
                '& fieldset': {
                  borderColor: '#d0d7de',
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                  borderWidth: '2px',
                },
                '&.Mui-error fieldset': {
                  borderColor: '#dc3545',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '16px 14px',
                '&::placeholder': {
                  color: '#999',
                  opacity: 1,
                }
              },
              '& .MuiFormHelperText-root': {
                marginLeft: '4px',
                fontSize: '12px',
              }
            }}
          />
          <Box className={styles.labelContainer}>
            <Tooltip title="Give your data pipeline a unique name" arrow placement="right">
              <IconButton size="small" className={styles.helpIcon}>
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* File Source Selector */}
        <FileSourceSelector
          value={formData.sourceType}
          onChange={handleSourceTypeChange}
          error={touched.sourceType ? errors.sourceType : undefined}
        />
        {formData.sourceType === 'upload' && 
        <Box className={styles.inputWrapper}>
          <MultiFileUploadForm />
          <Box className={styles.labelContainer}>
            <Tooltip title="Give your data pipeline a unique name" arrow placement="right">
              <IconButton size="small" className={styles.helpIcon}>
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>}
      </Box>

      {/* Action Buttons */}
      <Box className={styles.actions}>
        <Button
          variant="outlined"
          onClick={onBack}
          startIcon={<ArrowBackIcon />}
          className={styles.backButton}
          sx={{
            borderRadius: '8px',
            padding: '12px 28px',
            textTransform: 'none',
            fontWeight: 400,
            fontSize: '15px',
            borderColor: '#d0d7de',
            color: '#24292f',
            backgroundColor: '#ffffff',
            '&:hover': {
              borderColor: '#1976d2',
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            },
          }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          endIcon={<ArrowForwardIcon />}
          disabled={isNextDisabled}
          className={styles.nextButton}
          sx={{
            borderRadius: '8px',
            padding: '12px 28px',
            textTransform: 'none',
            fontWeight: 400,
            fontSize: '15px',
            backgroundColor: isNextDisabled ? '#d0d7de' : '#1976d2',
            color: isNextDisabled ? '#6e7781' : '#fff',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: isNextDisabled ? '#d0d7de' : '#1565c0',
              boxShadow: isNextDisabled ? 'none' : 'none',
            },
            '&.Mui-disabled': {
              backgroundColor: '#d0d7de',
              color: '#6e7781',
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PipelineForm;