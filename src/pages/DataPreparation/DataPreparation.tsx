import React, { useState } from 'react';
import styles from './DataPreparation.module.scss';
import uploadIcon from '../../assets/upload-file.svg';
import cloudIcon from '../../assets/upload-file.svg';
import dbIcon from '../../assets/upload-file.svg';
import infoIcon from '../../assets/upload-file.svg';

const DataPreparation: React.FC = () => {
  const [pipelineName, setPipelineName] = useState('');
  const [sourceType, setSourceType] = useState('');

  const isNextDisabled = !pipelineName || !sourceType;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create new data pipeline</h2>

        {/* Input Field */}
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter new data pipeline name*"
            value={pipelineName}
            onChange={(e) => setPipelineName(e.target.value)}
            className={styles.input}
          />
          <img src={infoIcon} alt="info" className={styles.infoIcon} />
        </div>

        {/* File Source Options */}
        <div className={styles.sectionTitle}>Select file source type*</div>
        <div className={styles.options}>
          <button
            className={`${styles.option} ${sourceType === 'upload' ? styles.active : ''}`}
            onClick={() => setSourceType('upload')}
          >
            <img src={uploadIcon} alt="Upload" />
            <span>Upload file</span>
          </button>
          <button
            className={`${styles.option} ${sourceType === 'cloud' ? styles.active : ''}`}
            onClick={() => setSourceType('cloud')}
          >
            <img src={cloudIcon} alt="Cloud" />
            <span>Cloud storage</span>
          </button>
          <button
            className={`${styles.option} ${sourceType === 'database' ? styles.active : ''}`}
            onClick={() => setSourceType('database')}
          >
            <img src={dbIcon} alt="Database" />
            <span>Database</span>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className={styles.actions}>
          <button className={styles.backBtn}>← Back</button>
          <button className={`${styles.nextBtn} ${isNextDisabled ? styles.disabled : ''}`} disabled={isNextDisabled}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataPreparation;