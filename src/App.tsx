import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary/ErrorBoundary';
import Layout from './layout/Layout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import ViewData from './pages/ViewData/ViewData';
import ExecuteQuery from './pages/ExecuteQuery/ExecuteQuery';

const App: React.FC = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/view-data" element={<ViewData />} />
            <Route path="/execute-query" element={<ExecuteQuery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
``