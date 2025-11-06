import React, { type ReactNode } from 'react';
import styles from './Layout.module.scss';
import Header from '../components/layout/Header/Header';
// import Footer from '../components/layout/Footer/Footer';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarCollapsed } = useAppContext();

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={`${styles.main} ${sidebarCollapsed ? styles.collapsed : styles.expanded}`}>
          {children}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;