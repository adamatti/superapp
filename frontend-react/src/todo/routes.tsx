import TodoHomePage from './HomePage';
import ShowItemPage from './ShowItemPage';
import ErrorPage from '../ErrorPage';
import { Navigate, type RouteObject } from 'react-router-dom';

const router: RouteObject[] = [
    {
        path: '/todo',
        element: <Navigate to="/todo/items" />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/todo/items',
        element: <TodoHomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/todo/items/:id',
        element: <ShowItemPage />,
        errorElement: <ErrorPage />,
    },
];

export default router;
