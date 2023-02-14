import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';

import ErrorPage from './ErrorPage';
import { routes as todoRoutes } from './todo';
import { routes as urlRoutes } from './url-shortener';
import { SignInScreen } from './auth';

interface HasChildren {
  children: React.ReactNode | null;
}

// TODO may use different layouts for different routes
interface RouteProviderOptions {
  layout: React.ComponentType<HasChildren>;
}

function ThisRouteProvider(options: RouteProviderOptions): JSX.Element {
  const enrichRoute = (route: RouteObject): RouteObject => {
    return {
      ...route,
      // this is required to use `router` elements on footer
      element: <options.layout>{route.element}</options.layout>,
      errorElement: <ErrorPage />,
    };
  };

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <SignInScreen />,
    },
    ...todoRoutes,
    ...urlRoutes,
  ].map(enrichRoute);

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default ThisRouteProvider;
