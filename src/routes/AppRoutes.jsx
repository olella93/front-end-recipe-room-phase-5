import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '../components/Layout';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import RecipeDetail from '../pages/RecipeDetail';
import Bookmarks from '../pages/Bookmarks';
import CreateRecipe from '../pages/CreateRecipe';
import GroupRecipe from '../pages/GroupRecipe';

const AppRoutes = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-orange-600 text-xl">
        Loading...
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'profile',
          element: isAuthenticated ? <Profile /> : <Navigate to="/login" replace />,
        },
        {
          path: 'recipes/:id',
          element: isAuthenticated ? <RecipeDetail /> : <Navigate to="/login" replace />,
        },
        {
          path: 'bookmarks',
          element: isAuthenticated ? <Bookmarks /> : <Navigate to="/login" replace />,
        },
        {
          path: 'create',
          element: isAuthenticated ? <CreateRecipe /> : <Navigate to="/login" replace />,
        },
        {
          path: 'group',
          element: isAuthenticated ? <GroupRecipe /> : <Navigate to="/login" replace />,
        },
      ],
    },
    {
      path: '/signup',
      element: isAuthenticated ? <Navigate to="/" replace /> : <Signup />,
    },
    {
      path: '/login',
      element: isAuthenticated ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
