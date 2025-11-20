import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadProgress from '../UploadProgress/UploadProgress';
import { RaiseBackendAPI } from '../../../api/endpoints/raiseBackend.api';
import type { UploadStatus } from '../../../api/types/raiseBackend.types';
import styles from './MultiFileUploadForm.module.scss'; 

const CHUNK_SIZE = 3 * 1024 * 1024; // 3 MB

const splitFileIntoChunks = (file: File): File[] => {
  const chunks: File[] = [];
  let start = 0;
  let index = 1;

  while (start < file.size) {
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const blob = file.slice(start, end);
    const chunkFile = new File([blob], `${file.name}.part${index}`, { type: file.type });
    chunks.push(chunkFile);
    start = end;
    index++;
  }

  return chunks;
};

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
      const chunks = splitFileIntoChunks(file);

      for (const chunk of chunks) {
        setUploadStatus(prev => ({ ...prev, [chunk.name]: 0 }));
        try {
          await RaiseBackendAPI.uploadFile(chunk, (progress) => {
            setUploadStatus(prev => ({ ...prev, [chunk.name]: progress }));
          });
        } catch (error) {
          console.error(error);
          setUploadStatus(prev => ({ ...prev, [chunk.name]: -1 }));
        }
      }
    }
  };

  return (
    <Box className={styles.container}>
      <Box
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          style={{ marginTop: '10px' }}
        />
      </Box>

      <Box mt={2}>
        {Object.entries(uploadStatus).map(([chunkName, progress]) => (
          <UploadProgress key={chunkName} fileName={chunkName} progress={progress} />
        ))}
      </Box>
    </Box>
  );
};

export default MultiFileUploadForm;