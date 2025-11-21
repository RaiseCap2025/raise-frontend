import React from 'react';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styles from './CollapsiblePanel.module.scss';

interface CollapsiblePanelProps {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
  headerIcon?: React.ReactNode;
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  children,
  isExpanded,
  onToggle,
  className = '',
  headerIcon,
}) => {
  return (
    <div className={`${styles.panel} ${className}`}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          {headerIcon && <span className={styles.headerIcon}>{headerIcon}</span>}
          <h3 className={styles.title}>{title}</h3>
        </div>
        <IconButton
          onClick={onToggle}
          className={styles.toggleButton}
          aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
          size="small"
        >
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>
      
      <div className={`${styles.content} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        {children}
      </div>
    </div>
  );
};

export default CollapsiblePanel;