import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { useAppContext } from '../../../context/AppContext';
import navIcon from '../../../assets/nav.svg';
import HomeIcon from '@mui/icons-material/Home';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MonitorIcon from '@mui/icons-material/Monitor';
import CalculateIcon from '@mui/icons-material/Calculate';
import TableChartIcon from '@mui/icons-material/TableChart';

const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useAppContext();

  const menuItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Services', icon: <ViewModuleIcon />, path: '/services' },
    { label: 'Activity Log', icon: <ListAltIcon />, path: '/activity-log' },
    { label: 'Monitoring', icon: <MonitorIcon />, path: '/monitoring' },
    { label: 'Cost calculator', icon: <CalculateIcon />, path: '/cost-calculator' },
    { label: 'Templates', icon: <TableChartIcon />, path: '/templates' },
    { label: 'Upload', icon: <TableChartIcon />, path: '/upload' },
    { label: 'View Data', icon: <TableChartIcon />, path: '/view-data' },
    { label: 'Execute Query', icon: <TableChartIcon />, path: '/execute-query' },
  ];

  return (
    <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.toggleWrapper}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          <img src={navIcon} alt="Toggle Sidebar" />
        </button>
      </div>
      <nav className={styles.nav}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
              >
                <span className={styles.icon}>{item.icon}</span>
                {!sidebarCollapsed && <span className={styles.label}>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;