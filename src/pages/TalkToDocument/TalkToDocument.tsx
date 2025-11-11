import React, { useEffect, useState } from 'react';
import { Box, Button, Select, MenuItem, Typography } from '@mui/material';
import ChatInput from '../../components/ui/ChatInput/ChatInput';
import { ChatbotAPI } from '../../api/endpoints/chatbot.api';

const TalkToDocument: React.FC = () => {
  const [message, setMessage] = useState('');
  const [pipeline, setPipeline] = useState('');
  const [chatbotId, setChatbotId] = useState<number | null>(null);
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const pipelines = ['Banking workflow', 'Retail workflow', 'Insurance workflow'];

  const handlePipelineSelect = (val: string) => setPipeline(val);

  const handleCreatePipeline = async () => {
    if (!pipeline) {
      alert('Please select a pipeline first!');
      return;
    }
    try {
      const res = await ChatbotAPI.createChatbot('Banking bot', pipeline, 1); // Pass template_id = 1
      const id = res.data?.data?.[0]?.[0]; // Adjust based on Snowflake response
      setChatbotId(id);
      alert(`Chatbot created with ID: ${id}`);
    } catch (error) {
      console.error('Error creating chatbot:', error);
      alert('Failed to create chatbot. Ensure template_id exists in R_Template.');
    }
  };

  const handleSend = async () => {
    if (!chatbotId) {
      alert('Please create a chatbot first!');
      return;
    }
    // Simulate AI response (replace with actual AI API call later)
    const aiResponse = `Here is the answer for: ${message}`;
    try {
      await ChatbotAPI.saveResponse(chatbotId, message, aiResponse);
      setMessage('');
      fetchChatHistory();
    } catch (error) {
      console.error('Error saving response:', error);
      alert('Failed to save chatbot response.');
    }
  };

  const fetchChatHistory = async () => {
    if (!chatbotId) return;
    try {
      const res = await ChatbotAPI.getResponses(chatbotId);
      const rows: string[][] = res.data?.data || [];
      const history = rows.map(row => ({
        user: row[1], // question
        bot: row[2],  // response
      }));
      setChatHistory([...chatHistory, ...history]);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };
  
  // Call this after creating chatbot or sending message
  useEffect(() => {
    if (chatbotId) fetchChatHistory();
  }, [chatbotId]);

  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      {/* Left Panel */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h5">Talk to Document</Typography>
        <Typography variant="subtitle1">Banking bot</Typography>

        {/* Chat History */}
        <Box sx={{ mt: 2 }}>
          {chatHistory.map((chat, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 'bold' }}>You:</Typography>
              <Typography>{chat.user}</Typography>
              <Typography sx={{ fontWeight: 'bold', mt: 1 }}>Bot:</Typography>
              <Typography>{chat.bot}</Typography>
            </Box>
          ))}
        </Box>

        {/* Chat Input */}
        <ChatInput value={message} onChange={setMessage} onSend={handleSend} />
      </Box>

      {/* Right Panel */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">Select data source</Typography>
        <Select
          value={pipeline}
          onChange={(e) => handlePipelineSelect(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Select pipeline</MenuItem>
          {pipelines.map((p) => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" fullWidth onClick={handleCreatePipeline}>
          Create new data pipeline
        </Button>
      </Box>
    </Box>
  );
};

export default TalkToDocument;