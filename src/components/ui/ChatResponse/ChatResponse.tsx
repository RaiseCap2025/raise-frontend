import React, { useState } from "react";
import ChatBubble from "../ChatBubble/ChatBubble";
import ChatTabs from "../ChatTabs/ChatTabs";
import ChatFooterActions from "../ChatFooterActions/ChatFooterActions";
import styles from "./ChatResponse.module.scss";

interface ChatResponseProps {
  userText: string;
  botText: string;
  tabs: string[];
  onRefresh?: () => void;
}

const ChatResponse: React.FC<ChatResponseProps> = ({ userText, botText, tabs, onRefresh }) => {
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
              <button className={styles.refreshBtn} onClick={onRefresh}>⟳</button>
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