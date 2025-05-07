import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: <h1>Login!</h1>
  }
]);

function PrivateRoute({ children }: any) {
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/login" />;
}


export function Router() {
  return <RouterProvider router={router} />;
}
