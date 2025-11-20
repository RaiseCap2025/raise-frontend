import React from "react";
import styles from "./ChatTabs.module.scss";

interface ChatTabsProps {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

const ChatTabs: React.FC<ChatTabsProps> = ({ tabs, activeIndex, onChange }) => {
  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${styles.tab} ${activeIndex === index ? styles.active : ""}`}
          onClick={() => onChange(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ChatTabs;