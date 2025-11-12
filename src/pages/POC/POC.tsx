import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './POC.module.scss';
import ChatResponse from '../../components/ui/ChatResponse/ChatResponse';

const dummyChatHistory = [
  { "user": "show me the revenued for last month", "bot": "This is our interpretation of your question:\\n\\nShow me the total revenue for the previous calendar month. Note: if you meant the past 30 days instead of the calendar month, please ask for 'past 30 days' to get that calculation." }
];

const POC: React.FC = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.chatArea}>
        <Typography className={styles.heading}>POC</Typography>
        <Box className={styles.chatScroll}>
          {dummyChatHistory.map((chat, idx) => (
            <ChatResponse key={idx} userText={chat.user} botText={chat.bot} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default POC;
