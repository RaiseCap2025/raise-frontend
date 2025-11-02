import React, { type ReactNode } from 'react';
import styles from './Layout.module.scss';
import Header from '../components/layout/Header/Header';
// import Footer from '../components/Footer/Footer';
import SideNav from '../components/layout/SideNav/SideNav';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}><Header /></div>
      <div className={styles.sidebar}><SideNav /></div>
      <main className={styles.main}>{children}</main>
      {/* <div className={styles.footer}><Footer /></div> */}
    </div>
  );
};

export default MainLayout;