import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import MultiFileUploadForm from '../../components/ui/MultiFileUploadForm/MultiFileUploadForm';

const UploadPage: React.FC = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Upload Files to S3
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <MultiFileUploadForm />
      </Paper>
    </Box>
  );
};

export default UploadPage;