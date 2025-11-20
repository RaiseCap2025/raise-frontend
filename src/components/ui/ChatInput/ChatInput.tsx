import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import styles from './ChatInput.module.scss';

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  value, 
  onChange, 
  onSend,
  placeholder = "Message to Raise"
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={styles.chatInputWrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <IconButton 
        className={styles.sendButton}
        onClick={onSend}
        disabled={!value.trim()}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default ChatInput;