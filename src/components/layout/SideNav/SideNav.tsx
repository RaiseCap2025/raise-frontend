import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './sideNav.module.scss';

const SideNav: React.FC = () => {
  return (
    <aside className={styles.sideNav}>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/view-data">View Data</NavLink>
          </li>
          <li>
            <NavLink to="/execute-query">Execute Query</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;