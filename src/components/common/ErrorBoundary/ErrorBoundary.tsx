import React from 'react';
import { Button, Typography, Box } from '@mui/material';

type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Uncaught error:', error, info);
    // connect to Sentry / LogRocket here
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5">Something went wrong.</Typography>
          <Button variant="contained" onClick={this.handleReload} sx={{ mt: 2 }}>
            Reload
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}
