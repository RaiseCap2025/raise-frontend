import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary/ErrorBoundary';
import Layout from './layout/Layout';
import AppRoutes from './routes';

const App: React.FC = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
         <AppRoutes/>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;