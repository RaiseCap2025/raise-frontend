import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getTheme } from './theme';
import { AppProvider } from './context/AppContext';
import './styles/index.scss';

const RootApp: React.FC = () => {
  const theme = getTheme("light" as 'light' | 'dark');

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AppProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RootApp />
);
