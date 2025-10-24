import React, { useEffect, useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import styles from './Home.module.scss';
import { useAppContext } from '../../contexts/AppContext';
import { UserAPI } from '../../api/endpoints/user.api';
import type { User } from '../../api/types/user.types';

const Home: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await UserAPI.getAll();
        setUsers(data.items);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleTheme = () => {
    dispatch({
      type: 'SET_THEME',
      payload: state.themeMode === 'light' ? 'dark' : 'light'
    });
  };

  return (
    <Box className={styles.home}>
      <Typography variant="h4" gutterBottom>
        {"Welcome"} 👋
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: state.themeMode === 'dark' ? 'black' : '#1976d',
        }}
      >
        You are currently using the <strong>{state.themeMode}</strong> theme.
      </Typography>

      <Button variant="contained" onClick={toggleTheme} sx={{ mt: 3 }}>
        Toggle Theme
      </Button>
    </Box>
  );
};

export default Home;
