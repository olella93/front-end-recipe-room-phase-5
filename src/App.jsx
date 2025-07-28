import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from './features/auth/authSlice';

import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import RecipeDetail from './pages/RecipeDetail';
import Bookmarks from './pages/Bookmarks';
import CreateRecipe from './pages/CreateRecipe';
import GroupRecipe from './pages/GroupRecipe';

const App = () => {
  const { isAuthenticated, loading, user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // On app initialization, if we have a token but no user data, fetch user info
  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, user]);

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
          path: 'recipes',
          element: <Recipes />,
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

export default App;
