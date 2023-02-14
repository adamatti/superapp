import ShowItemPage from './ShowItemPage';
import { Navigate, type RouteObject } from 'react-router-dom';
import { IsAuthenticated } from '~/auth';
import ListItemsPage from './ListItemsPage';

const router: RouteObject[] = [
  {
    path: '/todo',
    element: <Navigate to="/todo/items" />,
  },
  {
    path: '/todo/items',
    element: (
      <IsAuthenticated>
        <ListItemsPage />
      </IsAuthenticated>
    ),
  },
  {
    path: '/todo/items/:id',
    element: (
      <IsAuthenticated>
        <ShowItemPage />
      </IsAuthenticated>
    ),
  },
];

export default router;
