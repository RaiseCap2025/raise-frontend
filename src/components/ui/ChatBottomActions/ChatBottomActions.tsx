import React from 'react';
import { Button } from '@mui/material';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import DeploymentUnitOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import styles from './ChatBottomActions.module.scss';

interface ChatBottomActionsProps {
  onModelComparison?: () => void;
  onDeploy?: () => void;
}

const ChatBottomActions: React.FC<ChatBottomActionsProps> = ({ 
  onModelComparison, 
  onDeploy 
}) => {
  return (
    <div className={styles.bottomActions}>
      <Button
        variant="outlined"
        startIcon={<CompareArrowsOutlinedIcon />}
        onClick={onModelComparison}
        className={styles.actionButton}
      >
        Model comparison
      </Button>
      <Button
        variant="outlined"
        startIcon={<DeploymentUnitOutlinedIcon />}
        onClick={onDeploy}
        className={styles.actionButton}
      >
        Deploy
      </Button>
    </div>
  );
};

export default ChatBottomActions;