import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import { ROUTES } from '../constants';

const ViewData = lazy(() => import('../pages/ViewData/ViewData'));
const ExecuteQuery = lazy(() => import('../pages/ExecuteQuery/ExecuteQuery'));

export const ProtectedRoutes: RouteObject[] = [
  { path: ROUTES.VIEW_DATA, element: <ViewData /> },
  { path: ROUTES.EXECUTE_QUERY, element: <ExecuteQuery /> },
];