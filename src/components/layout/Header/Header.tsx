import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
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
    );
};

export default Header;