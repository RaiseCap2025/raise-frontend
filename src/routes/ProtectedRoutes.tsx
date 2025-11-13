import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import { ROUTES } from '../constants';

const ViewData = lazy(() => import('../pages/ViewData/ViewData'));
const ExecuteQuery = lazy(() => import('../pages/ExecuteQuery/ExecuteQuery'));
const CostCalculator = lazy(() => import('../pages/CostCalculator/CostCalculator'));
const UploadPage = lazy(() => import('../pages/UploadPage/UploadPage'));
const TalkToDocument = lazy(() => import('../pages/TalkToDocument/TalkToDocument'));
const Application = lazy(() => import('../pages/Application/Application'));
const ExperimentDeploy = lazy(() => import('../pages/ExperimentDeploy/ExperimentDeploy'));
const DataPreparation = lazy(() => import('../pages/DataPreparation/DataPreparation'));

export const ProtectedRoutes: RouteObject[] = [
  { path: ROUTES.VIEW_DATA, element: <ViewData /> },
  { path: ROUTES.EXECUTE_QUERY, element: <ExecuteQuery /> },
  { path: ROUTES.COST_CALCULATOR, element: <CostCalculator /> },
  { path: ROUTES.UPLOAD, element: <UploadPage /> },
  { path: ROUTES.TALK_TO_DOCUMENT, element: <TalkToDocument /> },
  { path: ROUTES.APPLICATION, element: <Application /> },
  { path: ROUTES.EXPERIMENT_DEPLOY, element: <ExperimentDeploy /> },
  { path: ROUTES.DATA_PREPARATION, element: <DataPreparation /> },
];