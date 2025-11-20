import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import styles from './TalkToDocument.module.scss';
import { ChatbotAPI } from '../../api/endpoints/chatbot.api';
import { QueryAPI } from '../../api/endpoints/snowflakeQuery.api';
import ChatResponse from '../../components/ui/ChatResponse/ChatResponse';
import ChatInput from '../../components/ui/ChatInput/ChatInput';
import CollapsiblePanel from '../../components/ui/CollapsiblePanel/CollapsiblePanel';
import PipelinePanel from '../../components/ui/PipelinePanel/PipelinePanel';
import ModelComparisonPanel, { type ModelComparisonData } from '../../components/ui/ModelComparisonPanel/ModelComparisonPanel';
import bankingBot from '../../assets/banking-bot.svg';
import { tabs } from '../../constants/tabs';

type RightPanelView = 'pipeline' | 'modelComparison';

const mockChatHistory : { user: string; bot: string }[] = [
  {
    user: "Hi",
    bot: "Hello! How can I assist you today?",
  },
  {
    user: "Can you tell me about your features?",
    bot: "Sure! I can help with text generation, summaries, coding support, and more.",
  },
  {
    user: "Great! Show me an example.",
    bot: "Absolutely! Here’s a simple demonstration of how I respond.",
  },
  {
    user: "Thanks!",
    bot: "You're welcome! Let me know if you need help with anything else.",
  },
]

const TalkToDocument: React.FC = () => {
  const [message, setMessage] = useState('');
  const [pipeline, setPipeline] = useState('');
  const [chatbotId, setChatbotId] = useState<number | null>(null);
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>(mockChatHistory);
  
  // Right panel state
  const [rightPanelView, setRightPanelView] = useState<RightPanelView>('pipeline');
  const [isPipelinePanelExpanded, setIsPipelinePanelExpanded] = useState(true);
  const [isModelComparisonExpanded, setIsModelComparisonExpanded] = useState(true);
  
  // Model comparison state
  const [modelComparisonData, setModelComparisonData] = useState<ModelComparisonData[]>([]);
  const [isLoadingComparison, setIsLoadingComparison] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const pipelines = ['Banking workflow', 'Retail workflow', 'Insurance workflow'];
  const documents = ['Document 1', 'Document 2', 'Document 3'];

  const handleSend = async () => {
    if (!chatbotId) {
      alert('Please create a chatbot first!');
      return;
    }
    try {
      setCurrentQuestion(message);
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

  const handleModelComparison = async () => {
    setRightPanelView('modelComparison');
    setIsLoadingComparison(true);
    
    try {
      // Simulate fetching model comparison data
      // In production, this would be an actual API call
      const models = ['Llama 3.0', 'Mistral Large 2.0', 'Gemini 2.5 Flash'];
      const comparisonPromises = models.map(async (modelName) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock response data
        const mockResponse = `This is a sample response from ${modelName} for the question: "${currentQuestion || 'sample question'}"`;
        const mockMetrics = {
          latency: Math.random() * 2000 + 500,
          inputTokens: Math.floor(Math.random() * 500 + 100),
          outputTokens: Math.floor(Math.random() * 800 + 200),
          totalCost: Math.random() * 0.01 + 0.001,
        };

        return {
          modelName,
          response: mockResponse,
          metrics: mockMetrics,
        };
      });

      const results = await Promise.all(comparisonPromises);
      setModelComparisonData(results);
    } catch (error) {
      console.error('Error fetching model comparison:', error);
      alert('Failed to fetch model comparison data.');
    } finally {
      setIsLoadingComparison(false);
    }
  };

  useEffect(() => {
    if (chatbotId) fetchChatHistory();
  }, [chatbotId]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.headerSection}>
          <Typography variant="h5" className={styles.heading}>Talk to document</Typography>
          <Typography variant="body2" className={styles.subHeading}>Experimentation</Typography>
        </div>
        
        {chatHistory.length === 0 && (
          <div className={styles.botSection}>
            <img src={bankingBot} alt="Banking bot" className={styles.botImage} />
            <Typography variant="h6" className={styles.botTitle}>Banking bot</Typography>
            <Typography variant="body2" className={styles.botDescription}>
              Experiment with your bot – Your smart banking assistant! Ask me anything
            </Typography>
          </div>
        )}
        
        <div className={styles.chatScroll}>
          {chatHistory.map((chat, idx) => (
            <ChatResponse 
              key={idx} 
              userText={chat.user} 
              botText={chat.bot} 
              tabs={tabs} 
              onRefresh={() => {}}
              onModelComparison={handleModelComparison}
            />
          ))}
        </div>
        
        <div className={styles.chatInputWrapper}>
          <ChatInput value={message} onChange={setMessage} onSend={handleSend} />
        </div>
      </div>

      <div className={`${styles.rightPanel} ${
        rightPanelView === 'modelComparison' ? styles.modelComparisonView : ''
      }`}>
        {rightPanelView === 'pipeline' ? (
          <CollapsiblePanel
            title="Select data source"
            isExpanded={isPipelinePanelExpanded}
            onToggle={() => setIsPipelinePanelExpanded(!isPipelinePanelExpanded)}
            headerIcon={<DescriptionOutlinedIcon />}
          >
            <PipelinePanel
              pipeline={pipeline}
              pipelines={pipelines}
              onSelect={setPipeline}
              onCreatePipeline={handleCreatePipeline}
              documents={documents}
            />
          </CollapsiblePanel>
        ) : (
          <CollapsiblePanel
            title="Model Comparison"
            isExpanded={isModelComparisonExpanded}
            onToggle={() => setIsModelComparisonExpanded(!isModelComparisonExpanded)}
            headerIcon={<CompareArrowsIcon />}
            className={styles.modelComparisonPanel}
          >
            <ModelComparisonPanel 
              data={modelComparisonData} 
              isLoading={isLoadingComparison}
            />
          </CollapsiblePanel>
        )}
      </div>
    </div>
  );
};

export default TalkToDocument;