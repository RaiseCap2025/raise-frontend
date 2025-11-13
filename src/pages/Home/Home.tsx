import React from 'react';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to RAISE</h1>
        <p className={styles.tagline}>
          From idea to AI - design, test, and deploy on a single platform.
        </p>
      </div>
    </div>
  );
};

export default Home;