import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import styles from "./ChatInput.module.scss";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  return (
    <Box className={styles.chatBox}>
      <TextField
        fullWidth
        placeholder="Message to Raise"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
      />
      <IconButton><AddIcon /></IconButton>
      <IconButton><MicIcon /></IconButton>
      <IconButton color="primary" onClick={onSend}><SendIcon /></IconButton>
    </Box>
  );
};

export default ChatInput;