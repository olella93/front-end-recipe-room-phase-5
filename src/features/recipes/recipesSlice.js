import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRecipesAPI, fetchRecipeByIdAPI, createRecipeAPI, searchRecipesAPI, fetchCommentsAPI, submitRatingAPI, deleteRecipeAPI, updateRecipeAPI } from './recipesAPI';
export const deleteRecipe = createAsyncThunk('recipes/delete', async (id) => deleteRecipeAPI(id));

export const fetchRecipes = createAsyncThunk('recipes/fetchAll', async (filters) => fetchRecipesAPI(filters));
export const searchRecipes = createAsyncThunk('recipes/search', async (query) => searchRecipesAPI(query));
export const fetchRecipeById = createAsyncThunk('recipes/fetchById', async (id) => fetchRecipeByIdAPI(id));
export const createRecipe = createAsyncThunk('recipes/create', async (recipeData) => createRecipeAPI(recipeData));
export const fetchComments = createAsyncThunk('recipes/fetchComments', async (recipeId) => fetchCommentsAPI(recipeId));
export const submitRating = createAsyncThunk('recipes/submitRating', async ({ recipeId, value }) => submitRatingAPI(recipeId, value));
export const updateRecipe = createAsyncThunk('recipes/update', async ({ recipeId, recipeData }) => {
  return await updateRecipeAPI(recipeId, recipeData);
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    list: [],
    selectedRecipe: null,
    loading: false,
    error: null,
    page: 1,
    totalPages: null,
    total: 0
  },
  reducers: {
    resetRecipes(state) {
      state.list = [];
      state.page = 1;
      state.totalPages = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        if (state.selectedRecipe) {
          state.selectedRecipe.comments = action.payload;
        }
      })
      .addCase(updateRecipe.fulfilled, (state) => {
        
      });
  }
});

export default recipesSlice.reducer;
