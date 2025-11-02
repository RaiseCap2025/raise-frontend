import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { useAppContext } from '../../../context/AppContext';

const Sidebar: React.FC = () => {
  const { sidebarCollapsed } = useAppContext();

  return (
    <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}>
      <nav>
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/view-data">View Data</NavLink></li>
          <li><NavLink to="/execute-query">Execute Query</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;