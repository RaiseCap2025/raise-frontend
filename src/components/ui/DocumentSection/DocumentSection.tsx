import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './DocumentSection.module.scss';

interface DocumentSectionProps {
  documents: string[];
}

const DocumentSection: React.FC<DocumentSectionProps> = ({ documents }) => {
  return (
    <Box className={styles.documentSection}>
      <Typography className={styles.panelTitle}>Document lists</Typography>
      {documents.map((doc, idx) => (
        <Box key={idx} className={styles.docItem}>
          <Typography>{doc}</Typography>
          <Box>
            <IconButton size="small"><EditIcon /></IconButton>
            <IconButton size="small"><DeleteIcon /></IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DocumentSection;
