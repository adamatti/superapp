import {
  createBrowserRouter,
} from "react-router-dom";

import HomePage from "./HomePage";
import ErrorPage from './ErrorPage';
import todoRoutes from './todo/routes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  ...todoRoutes  
]);

export default router;