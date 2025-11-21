import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import styles from './TalkToDocument.module.scss';
import { ChatbotAPI } from '../../api/endpoints/chatbot.api';
import { QueryAPI } from '../../api/endpoints/snowflakeQuery.api';
import ChatResponse from '../../components/ui/ChatResponse/ChatResponse';
import ChatInput from '../../components/ui/ChatInput/ChatInput';
import ChatBottomActions from '../../components/ui/ChatBottomActions/ChatBottomActions';
import SidePanel from '../../components/ui/Sidepanel/Sidepanel';
import PipelinePanel from '../../components/ui/PipelinePanel/PipelinePanel';
import ModelComparisonPanel, { type ModelComparisonData } from '../../components/ui/ModelComparisonPanel/ModelComparisonPanel';
import bankingBot from '../../assets/banking-bot.svg';
import { tabs } from '../../constants/tabs';

const mockChatHistory: { user: string; bot: string }[] = [
  {
    user: "Hi",
    bot: "Hello! How can I assist you today?",
  },
  {
    user: "Can you tell me about your features?",
    bot: "Sure! I can help with text generation, summaries, coding support, and more.",
  }
];

const TalkToDocument: React.FC = () => {
  const [message, setMessage] = useState('');
  const [pipeline, setPipeline] = useState('');
  const [chatbotId, setChatbotId] = useState<number | null>(null);
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>(mockChatHistory);
  
  // Panel state - only right side panels
  const [isPipelinePanelExpanded, setIsPipelinePanelExpanded] = useState(true);
  const [isModelComparisonExpanded, setIsModelComparisonExpanded] = useState(false);
  
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
      const aiResponse = cortexResponse.data?.data?.[0]?.[0];
      setChatHistory([...chatHistory, { user: message, bot: aiResponse || 'No response' }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  const handleCreatePipeline = async () => {
    try {
      const res = await ChatbotAPI.createChatbot('Banking bot', '1', 1);
      const id = (res as { data?: { data?: any[][] } }).data?.data?.[0]?.[0];
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
      const rows: string[][] = (res as { data?: { data?: string[][] } }).data?.data || [];
      const history = rows.map(row => ({ user: row[1], bot: row[2] }));
      setChatHistory(history.reverse());
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleModelComparison = async () => {
    // Close pipeline panel and open model comparison
    setIsPipelinePanelExpanded(false);
    setIsModelComparisonExpanded(true);
    setIsLoadingComparison(true);
    
    try {
      const models = ['Llama 3.0'];
      const comparisonPromises = models.map(async (modelName) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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

  const handleDeploy = () => {
    alert('Deploy functionality will be implemented');
  };

  const handleTogglePipelinePanel = () => {
    setIsPipelinePanelExpanded(!isPipelinePanelExpanded);
    // Close model comparison when opening pipeline
    if (!isPipelinePanelExpanded) {
      setIsModelComparisonExpanded(false);
    }
  };

  const handleToggleModelComparison = () => {
    setIsModelComparisonExpanded(!isModelComparisonExpanded);
    // Close pipeline when opening model comparison
    if (!isModelComparisonExpanded) {
      setIsPipelinePanelExpanded(false);
    }
  };

  useEffect(() => {
    if (chatbotId) fetchChatHistory();
  }, [chatbotId]);

  // Calculate main content margin based on panel state
  const getMainContentStyle = () => {
    const rightMargin = (!isPipelinePanelExpanded && !isModelComparisonExpanded) ? '0' : 
      isPipelinePanelExpanded ? '30%' : '40%';
    return {
      marginRight: rightMargin,
    };
  };

  return (
    <div className={`${styles.container} ${isModelComparisonExpanded ? 'modelComparisonEnabled' : ''}`}>
      {/* Main Chat Content */}
      <div className={styles.mainContent} style={getMainContentStyle()}>
        <div className={styles.headerSection}>
          <Typography variant="h5" className={styles.heading}>
            Talk to document
          </Typography>
          <Typography variant="body2" className={styles.subHeading}>
            <DescriptionOutlinedIcon className={styles.icon} />
            Experimentation
          </Typography>
        </div>
        
        {chatHistory.length === 0 && (
          <div className={styles.botSection}>
            <img src={bankingBot} alt="Banking bot" className={styles.botImage} />
            <Typography variant="h6" className={styles.botTitle}>
              Banking bot
            </Typography>
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
            />
          ))}
        </div>
        
        {chatHistory.length > 0 && (
          <ChatBottomActions 
            onModelComparison={handleModelComparison}
            onDeploy={handleDeploy}
          />
        )}
        
        <div className={styles.chatInputWrapper}>
          <ChatInput 
            value={message} 
            onChange={setMessage} 
            onSend={handleSend}
            placeholder="Message to Raise"
          />
        </div>
      </div>

      {/* Right Panel - Pipeline Selection (Initial view) */}
      <SidePanel
        title="Pipeline Selection"
        isExpanded={isPipelinePanelExpanded}
        onToggle={handleTogglePipelinePanel}
      >
          <PipelinePanel
            pipeline={pipeline}
            pipelines={pipelines}
            onSelect={setPipeline}
            onCreatePipeline={handleCreatePipeline}
            documents={documents}
          />
      </SidePanel>

      {/* Right Panel - Model Comparison */}
      {isModelComparisonExpanded && (
        <SidePanel
        title="Model Comparison"
        isExpanded={isModelComparisonExpanded}
        onToggle={handleToggleModelComparison}
        className={styles.modelComparisonPanel}
      >
          <ModelComparisonPanel 
            data={modelComparisonData} 
            isLoading={isLoadingComparison}
          />
      </SidePanel>
      )}
    </div>
  );
};

export default TalkToDocument;