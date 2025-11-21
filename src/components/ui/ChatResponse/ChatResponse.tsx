import React, { useState } from "react";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ChatBubble from "../ChatBubble/ChatBubble";
import ChatTabs from "../ChatTabs/ChatTabs";
import ChatFooterActions from "../ChatFooterActions/ChatFooterActions";
import raiseLogo from "../../../assets/raise-logo.svg";
import styles from "./ChatResponse.module.scss";
import { formatBotMessage } from "../../../utility";

interface ChatResponseProps {
  userText: string;
  botText: string;
  tabs: string[];
  onRefresh?: () => void;
}

const ChatResponse: React.FC<ChatResponseProps> = ({ 
  userText, 
  botText, 
  tabs, 
  onRefresh
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const formattedBotText = formatBotMessage(botText);

  return (
    <div className={styles.chatResponse}>
      {/* User Bubble */}
      <ChatBubble variant="user">{userText}</ChatBubble>

      {/* Bot Bubble */}
      <ChatBubble
        variant="bot"
        header={
          <div className={styles.botHeader}>
            <div className={styles.brandRow}>
              <img src={raiseLogo} alt="RAISE" className={styles.logo} />
              <IconButton 
                className={styles.refreshBtn}
                onClick={onRefresh}
                size="small"
              >
                <RefreshIcon />
              </IconButton>
            </div>
            <ChatTabs tabs={tabs} activeIndex={activeTab} onChange={setActiveTab} />
          </div>
        }
        footer={<ChatFooterActions />}
      >
        <div className={styles.botContent} dangerouslySetInnerHTML={{ __html: formattedBotText }} />
      </ChatBubble>
    </div>
  );
};

export default ChatResponse;