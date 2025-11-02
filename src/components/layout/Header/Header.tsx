import React from 'react';
import styles from './Header.module.scss';
import raiseLogo from '../../../assets/raise-logo.svg';
import capgeminiLogo from '../../../assets/capgemini-logo.svg';
import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Left: RAISE Logo */}
      <div className={styles.left}>
        <img src={raiseLogo} alt="RAISE Logo" className={styles.logo} />
      </div>

      {/* Center: Action Icons */}
      <div className={styles.center}>
        <IconButton><ChatIcon /></IconButton>
        <IconButton><MailIcon /></IconButton>
        <IconButton><NotificationsIcon /></IconButton>
        <IconButton><AccountCircleIcon /></IconButton>
      </div>

      {/* Right: Capgemini Logo */}
      <div className={styles.right}>
        <img src={capgeminiLogo} alt="Capgemini Logo" className={styles.logoRight} />
      </div>
    </header>
  );
};

export default Header;