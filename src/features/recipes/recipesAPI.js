import API from "../../services/api";

// Helper for cleaner error throwing
const handleError = (error) => {
  throw error.response?.data || error.message || error;
};

// Unified request wrapper (optional but clean)
const request = async (method, url, data = null) => {
  try {
    const response = await API[method](url, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 🌐 GET all recipes
export const getAllRecipesAPI = () => request("get", "/recipes");

// 📄 GET single recipe by ID
export const getRecipeByIdAPI = (id) => request("get", `/recipes/${id}`);

// 📝 POST create recipe
export const createRecipeAPI = (recipeData) => request("post", "/recipes", recipeData);

// ✏️ PUT update recipe
export const updateRecipeAPI = (id, recipeData) => request("put", `/recipes/${id}`, recipeData);

// 🔍 GET search recipes
export const searchRecipesAPI = (searchTerm) =>
  request("get", `/recipes/search?q=${encodeURIComponent(searchTerm)}`);
