import TodoHomePage from './HomePage';
import ShowItemPage from './ShowItemPage';
import { Navigate, type RouteObject } from 'react-router-dom';

const router: RouteObject[] = [
  {
    path: '/todo',
    element: <Navigate to="/todo/items" />,
  },
  {
    path: '/todo/items',
    element: <TodoHomePage />,
  },
  {
    path: '/todo/items/:id',
    element: <ShowItemPage />,
  },
];

export default router;
