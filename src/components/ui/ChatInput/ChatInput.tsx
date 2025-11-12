import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import styles from './ChatInput.module.scss';

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        placeholder="Message to Raise"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className={styles.sendButton} onClick={onSend}>
        <SendIcon />
      </button>
    </div>
  );
};

export default ChatInput;