import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { SignIn } from './pages/SignIn/SignIn';
import { Register } from './pages/Register/Register';

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
    element: <SignIn />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

function PrivateRoute({ children }: any) {
  const isAuthenticated = false;
  return isAuthenticated ? children : <Navigate to="/login" />;
}


export function Router() {
  return <RouterProvider router={router} />;
}
