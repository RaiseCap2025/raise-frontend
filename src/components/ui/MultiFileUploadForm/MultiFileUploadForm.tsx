import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadProgress from '../UploadProgress/UploadProgress';
import { RaiseBackendAPI } from '../../../api/endpoints/raiseBackend.api';
import type { UploadStatus } from '../../../api/types/raiseBackend.types';

const MultiFileUploadForm: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({});

  const handleFiles = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      setFiles(prev => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    for (const file of files) {
      setUploadStatus(prev => ({ ...prev, [file.name]: 0 }));
      try {
        await RaiseBackendAPI.uploadFile(file, (progress) => {
          setUploadStatus(prev => ({ ...prev, [file.name]: progress }));
        });
      } catch (error) {
        console.error(error);
        setUploadStatus(prev => ({ ...prev, [file.name]: -1 }));
      }
    }
  };

  return (
    <Box>
      <Box
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        sx={{
          border: '2px dashed #ccc',
          borderRadius: '8px',
          p: 4,
          textAlign: 'center',
          mb: 2,
        }}
      >
        <Typography>Drag & Drop files here or click below to select</Typography>
        <input
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          style={{ marginTop: '10px' }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={files.length === 0}
      >
        Upload All
      </Button>

      <Box mt={2}>
        {files.map(file => (
          <UploadProgress
            key={file.name}
            fileName={file.name}
            progress={uploadStatus[file.name] || 0}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MultiFileUploadForm;