import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import styles from './TalkToDocument.module.scss';
import { ChatbotAPI } from '../../api/endpoints/chatbot.api';
import { QueryAPI } from '../../api/endpoints/snowflakeQuery.api';
import ChatResponse from '../../components/ui/ChatResponse/ChatResponse';
import ChatInput from '../../components/ui/ChatInput/ChatInput';
import PipelineSection from '../../components/ui/PipelineSection/PipelineSection';
import DocumentSection from '../../components/ui/DocumentSection/DocumentSection';

const TalkToDocument: React.FC = () => {
  const [message, setMessage] = useState('');
  const [pipeline, setPipeline] = useState('');
  const [chatbotId, setChatbotId] = useState<number | null>(null);
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const pipelines = ['Banking workflow', 'Retail workflow', 'Insurance workflow'];
  const documents = ['Document 1', 'Document 2', 'Document 3'];

  const handleSend = async () => {
    if (!chatbotId) {
      alert('Please create a chatbot first!');
      return;
    }
    try {
      const cortexQuery = `SELECT SNOWFLAKE.CORTEX.COMPLETE('mistral-large2', '${message.replace(/'/g, "''")}');`;
      const payload = {
        timeout: 60,
        warehouse: 'SNOW_CAP_SPC',
        database: 'SNOW_CAPGE_SPC',
        schema: 'SNOW_CAP_RAISE',
        statement: cortexQuery,
      };
      const cortexResponse = await QueryAPI.query(JSON.stringify(payload));
      const aiResponse = cortexResponse.data?.data?.[0]?.[0] || 'No response';
      await ChatbotAPI.saveResponse(chatbotId, message, aiResponse);
      setMessage('');
      fetchChatHistory();
    } catch (error) {
      console.error('Error during chatbot interaction:', error);
      alert('Failed to process chatbot message.');
    }
  };

  const handleCreatePipeline = async () => {
    if (!pipeline) {
      alert('Please select a pipeline first!');
      return;
    }
    try {
      const res = await ChatbotAPI.createChatbot('Banking bot', '101', 2);
      const id = res.data?.data?.[0]?.[0];
      setChatbotId(id);
      alert(`Chatbot created with ID: ${id}`);
    } catch (error) {
      console.error('Error creating chatbot:', error);
      alert('Failed to create chatbot. Ensure template_id exists in R_Template.');
    }
  };

  const fetchChatHistory = async () => {
    if (!chatbotId) return;
    try {
      const res = await ChatbotAPI.getResponses(chatbotId);
      const rows: string[][] = res.data?.data || [];
      const history = rows.map(row => ({ user: row[1], bot: row[2] }));
      setChatHistory(history.reverse());
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  useEffect(() => {
    if (chatbotId) fetchChatHistory();
  }, [chatbotId]);

  return (
    <Box className={styles.container}>
      <Box className={styles.chatArea}>
        <Typography className={styles.heading}>Talk to document</Typography>
        <Typography className={styles.subHeading}>Experimentation</Typography>
        <Box className={styles.chatScroll}>
          {chatHistory.map((chat, idx) => (
            <ChatResponse key={idx} userText={chat.user} botText={chat.bot} />
          ))}
        </Box>
        <ChatInput value={message} onChange={setMessage} onSend={handleSend} />
      </Box>
      <Box className={styles.rightPanel}>
        <PipelineSection
          pipeline={pipeline}
          pipelines={pipelines}
          onSelect={setPipeline}
          onCreatePipeline={handleCreatePipeline}
        />
        <DocumentSection documents={documents} />
      </Box>
    </Box>
  );
};

export default TalkToDocument;
