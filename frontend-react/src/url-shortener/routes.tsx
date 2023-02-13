import { type RouteObject } from 'react-router-dom';
import { IsAuthenticated } from '~/auth';
import { ListUrls } from './components';

const router: RouteObject[] = [
  {
    path: '/urls',
    element: (
      <IsAuthenticated>
        <ListUrls />
      </IsAuthenticated>
    ),
  },
];

export default router;
