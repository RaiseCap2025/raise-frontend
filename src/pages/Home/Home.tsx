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
      <h1>Welcome to the RAISE Home Page</h1>
      <Box display="flex" gap={2}>
        <Card onClick={() => handleNavigation('/fetch-data')} style={{ cursor: 'pointer' }}>
          <CardContent>
            <Typography variant="h6">Fetching Data</Typography>
            <Typography variant="body2">Navigate to fetch data from Snowflake.</Typography>
          </CardContent>
        </Card>
        <Card onClick={() => handleNavigation('/create-data')} style={{ cursor: 'pointer' }}>
          <CardContent>
            <Typography variant="h6">Creating Data</Typography>
            <Typography variant="body2">Navigate to create data in Snowflake.</Typography>
          </CardContent>
        </Card>
        <Card onClick={() => handleNavigation('/update-data')} style={{ cursor: 'pointer' }}>
          <CardContent>
            <Typography variant="h6">Updating Data</Typography>
            <Typography variant="body2">Navigate to update data in Snowflake.</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Home;
