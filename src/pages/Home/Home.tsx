import React from 'react';
import { Box } from '@mui/material';
import styles from './Home.module.scss';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <Box className={styles.home}>
      <h1>Welcome to the RAISE</h1>
      <Box display="flex" gap={2}>
        <Card onClick={() => handleNavigation('/view-data')} style={{ cursor: 'pointer' }}>
          <CardContent>
            <Typography variant="h6">View Data</Typography>
            <Typography variant="body2">To view data from Snowflake.</Typography>
          </CardContent>
        </Card>
        <Card onClick={() => handleNavigation('/execute-query')} style={{ cursor: 'pointer' }}>
          <CardContent>
            <Typography variant="h6">Execute Query</Typography>
            <Typography variant="body2">To execute generic queries.</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Home;
