import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getTheme } from './theme';
import './styles/index.scss';
import { AppProvider } from './context/AppContext';

const RootApp: React.FC = () => {
  const theme = getTheme('light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RootApp />);