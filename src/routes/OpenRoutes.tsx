import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import { ROUTES } from '../constants';

const Home = lazy(() => import('../pages/Home/Home'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export const OpenRoutes: RouteObject[] = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.NOT_FOUND, element: <NotFound /> },
];