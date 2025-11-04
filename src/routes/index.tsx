
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { OpenRoutes } from './OpenRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';

const AppRoutes: React.FC = () => {
  const routes = [...OpenRoutes, ...ProtectedRoutes];
  return useRoutes(routes);
};

export default AppRoutes;
