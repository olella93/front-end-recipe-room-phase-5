import API from "../../services/api";

export const getAllRecipesAPI = async () => {
  try {
    const response = await API.get("/recipes");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecipeByIdAPI = async (id) => {
  try {
    const response = await API.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRecipeAPI = async (recipeData) => {
  try {
    const response = await API.post("/recipes", recipeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRecipeAPI = async (id, recipeData) => {
  try {
    const response = await API.put(`/recipes/${id}`, recipeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchRecipesAPI = async (searchTerm) => {
  try {
    const response = await API.get(`/recipes/search?q=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
