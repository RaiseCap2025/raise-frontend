// src/pages/DataPreparation/types.ts

export type FileSourceType = 'upload' | 'cloud' | 'database' | null;

export interface FileSourceOption {
  value: 'upload' | 'cloud' | 'database';
  label: string;
  icon: React.ReactNode;
  description?: string;
}

export interface PipelineFormData {
  pipelineName: string;
  sourceType: FileSourceType;
  // Add more fields as needed for next steps
}

export interface FormErrors {
  pipelineName?: string;
  sourceType?: string;
}

export interface StepConfig {
  id: number;
  title: string;
  description?: string;
}