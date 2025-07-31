import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import Recipes from '../pages/Recipes';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import RecipeDetail from '../pages/RecipeDetail';
import CreateRecipe from '../pages/CreateRecipe';
import Bookmarks from '../pages/Bookmarks';
import GroupRecipe from '../pages/GroupRecipe';
import GroupsList from '../pages/GroupsList';
import EditRecipe from '../pages/EditRecipe';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:id" element={
        <PrivateRoute>
          <RecipeDetail />
        </PrivateRoute>
      } />
      <Route path="/create-recipe" element={<CreateRecipe />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/groups" element={<GroupsList />} />
      <Route path="/groups/:id/recipes" element={<GroupRecipe />} />
      <Route path="/recipes/:id/edit" element={
        <PrivateRoute>
          <EditRecipe />
        </PrivateRoute>
      } />
    </Routes>
  );
}
