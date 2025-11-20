import React from "react";
import { IconButton } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import styles from "./ChatFooterActions.module.scss";

interface ChatFooterActionsProps {
  onCopy?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
}

const ChatFooterActions: React.FC<ChatFooterActionsProps> = ({ onCopy, onLike, onDislike }) => {
  return (
    <div className={styles.actions}>
      <IconButton className={styles.actionBtn} onClick={onCopy} size="small">
        <ContentCopyOutlinedIcon />
      </IconButton>
      <IconButton className={styles.actionBtn} onClick={onLike} size="small">
        <ThumbUpOutlinedIcon />
      </IconButton>
      <IconButton className={styles.actionBtn} onClick={onDislike} size="small">
        <ThumbDownOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default ChatFooterActions;