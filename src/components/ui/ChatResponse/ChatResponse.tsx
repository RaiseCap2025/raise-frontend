import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from './ChatResponse.module.scss';
import { tabs } from '../../../constants/tabs';

interface ChatResponseProps {
  userText: string;
  botText: string;
}

const ChatResponse: React.FC<ChatResponseProps> = ({ userText, botText }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box className={styles.chatResponse} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box className={styles.userBubble}>{userText}</Box>
      <Box className={styles.botBubble}>
        <Tabs
          value={selectedTab}
          onChange={(e, val) => setSelectedTab(val)}
          variant="scrollable"
          className={styles.modelTabs}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
        <Typography>{botText}</Typography>
        <Box className={styles.actionButtons}>
          <Button variant="outlined" size="small">Relevant sections</Button>
          <IconButton><RefreshIcon /></IconButton>
          <IconButton>👍</IconButton>
          <IconButton>👎</IconButton>
          <IconButton>📋</IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatResponse;
