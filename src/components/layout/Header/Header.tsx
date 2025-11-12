import React from 'react';
import styles from './Header.module.scss';
import raiseLogo from '../../../assets/raise-logo.svg';
import capgeminiLogo from '../../../assets/capgemini-logo.svg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}><img src={raiseLogo} alt='RAISE' /></div>
      <div className={styles.center}><img src={capgeminiLogo} alt='Capgemini' /></div>
      <div className={styles.right}>
        <AccountCircleIcon />
        <span className={styles.user}>Anna Marie | <strong>User</strong></span>
      </div>
    </header>
  );
};

export default Header;