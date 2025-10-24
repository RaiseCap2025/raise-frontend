import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getTheme } from './theme';
import './styles/index.scss';
import { initI18n } from './i18n';

const RootApp: React.FC = () => {
  const { state } = useAppContext();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n(state.locale).then(() => setReady(true));
  }, [state.locale]);

  if (!ready) return <div>Loading translations...</div>;

  const theme = getTheme(state.themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <RootApp />
  </AppProvider>
);
