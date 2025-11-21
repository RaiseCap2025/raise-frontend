import React from 'react';
import styles from './CollapsibleSection.module.scss';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  headerIcon?: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  children,
}) => {
  return (
    <div className={styles.section}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default CollapsibleSection;