import React from 'react';
import { Box, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import styles from './ChatInput.module.scss';

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  return (
    <Box className={styles.chatInput}>
      <input
        type="text"
        placeholder="Message to Raise"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <IconButton><AddIcon /></IconButton>
      <IconButton><MicIcon /></IconButton>
      <IconButton className={styles.sendButton} onClick={onSend}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
