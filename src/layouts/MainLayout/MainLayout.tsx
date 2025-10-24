import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
  <div className={styles.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          onClick={() => navigate("/")} 
          style={{ cursor: 'pointer' }}
        >
          RAISE
        </Typography>
      </Toolbar>
    </AppBar>
    <Container sx={{ mt: 4 }}>
      <Outlet />
    </Container>
  </div>);
};

export default MainLayout;
