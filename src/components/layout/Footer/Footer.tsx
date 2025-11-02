import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <p>© {new Date().getFullYear()} RAISE. All rights reserved.</p>
  </footer>
);

export default Footer;