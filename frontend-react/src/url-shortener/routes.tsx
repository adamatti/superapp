import { type RouteObject } from 'react-router-dom';
import { ListUrls } from './components';

const router: RouteObject[] = [
  {
    path: '/urls',
    element: <ListUrls />,
  },
];

export default router;
