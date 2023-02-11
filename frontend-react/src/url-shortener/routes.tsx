import ErrorPage from '../ErrorPage';
import { type RouteObject } from 'react-router-dom';
import { ListUrls } from './components';

const router: RouteObject[] = [
  {
    path: '/urls',
    element: <ListUrls />,
    errorElement: <ErrorPage />,
  },
];

export default router;
