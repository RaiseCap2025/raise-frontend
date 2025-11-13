import React from "react";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import styles from "./ChatFooterActions.module.scss";

interface ChatFooterActionsProps {
  onCopy?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
}

const ChatFooterActions: React.FC<ChatFooterActionsProps> = ({ onCopy, onLike, onDislike }) => {
  return (
    <div className={styles.footerActions}>
      <IconButton id="footer-icons" onClick={onCopy}><ContentCopyIcon /></IconButton>
      <IconButton id="footer-icons" onClick={onLike}><ThumbUpAltOutlinedIcon /></IconButton>
      <IconButton id="footer-icons" onClick={onDislike}><ThumbDownAltOutlinedIcon /></IconButton>
    </div>
  );
};

export default ChatFooterActions;