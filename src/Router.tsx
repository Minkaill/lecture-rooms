import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage/Home.page';
import { Category } from './pages/Category/Category';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: "/category/:id",
    element: <Category />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
