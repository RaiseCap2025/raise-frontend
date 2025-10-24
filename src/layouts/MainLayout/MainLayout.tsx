import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const MainLayout: React.FC = () => (
  <div className={styles.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">RAISE</Typography>
      </Toolbar>
    </AppBar>
    <Container sx={{ mt: 4 }}>
      <Outlet />
    </Container>
  </div>
);

export default MainLayout;
