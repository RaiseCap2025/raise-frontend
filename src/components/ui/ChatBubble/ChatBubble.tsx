import React from "react";
import styles from "./ChatBubble.module.scss";

interface ChatBubbleProps {
  variant: "user" | "bot";
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ variant, header, footer, children }) => {
  return (
    <div className={`${styles.chatBubble} ${styles[variant]}`}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default ChatBubble;