import React, { useState } from "react";
import { Button } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ChatBubble from "../ChatBubble/ChatBubble";
import ChatTabs from "../ChatTabs/ChatTabs";
import ChatFooterActions from "../ChatFooterActions/ChatFooterActions";
import styles from "./ChatResponse.module.scss";

interface ChatResponseProps {
  userText: string;
  botText: string;
  tabs: string[];
  onRefresh?: () => void;
  onModelComparison?: () => void;
}

const ChatResponse: React.FC<ChatResponseProps> = ({ 
  userText, 
  botText, 
  tabs, 
  onRefresh,
  onModelComparison 
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.chatResponse}>
      {/* User Bubble */}
      <ChatBubble variant="user">{userText}</ChatBubble>

      {/* Bot Bubble */}
      <ChatBubble
        variant="bot"
        header={
          <div className={styles.botHeader}>
            <div className={styles.botHeaderTop}>
              <span className={styles.brand}>RAISE</span>
              <div className={styles.actions}>
                {onModelComparison && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<CompareArrowsIcon />}
                    onClick={onModelComparison}
                    className={styles.compareBtn}
                  >
                    Model Comparison
                  </Button>
                )}
                <button className={styles.refreshBtn} onClick={onRefresh}>⟳</button>
              </div>
            </div>
            <ChatTabs tabs={tabs} activeIndex={activeTab} onChange={setActiveTab} />
          </div>
        }
        footer={<ChatFooterActions />}
      >
        <div className={styles.botContent} dangerouslySetInnerHTML={{ __html: botText }} />
      </ChatBubble>
    </div>
  );
};

export default ChatResponse;