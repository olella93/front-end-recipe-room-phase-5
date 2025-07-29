import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllRecipesAPI,
  getRecipeByIdAPI,
  createRecipeAPI,
  updateRecipeAPI,
  searchRecipesAPI
} from './recipesAPI';

// Thunks
export const fetchAllRecipes = createAsyncThunk(
  'recipes/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await getAllRecipesAPI();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchRecipes = createAsyncThunk(
  'recipes/search',
  async (searchTerm, thunkAPI) => {
    try {
      const response = await searchRecipesAPI(searchTerm);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await getRecipeByIdAPI(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createRecipe = createAsyncThunk(
  'recipes/create',
  async (recipeData, thunkAPI) => {
    try {
      const response = await createRecipeAPI(recipeData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async ({ id, recipeData }, thunkAPI) => {
    try {
      const response = await updateRecipeAPI(id, recipeData);
      return { id, ...response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  items: [],
  currentRecipe: null,
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  animationTrigger: null, // ID of recipe to animate
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearAnimationTrigger: (state) => {
      state.animationTrigger = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search
      .addCase(searchRecipes.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.animationTrigger = action.payload.id; // Trigger animation for new item
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(recipe => recipe.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentRecipe && state.currentRecipe.id === action.payload.id) {
          state.currentRecipe = action.payload;
        }
        state.animationTrigger = action.payload.id; // Trigger animation for updated item
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearCurrentRecipe,
  clearSearchResults,
  clearAnimationTrigger
} = recipesSlice.actions;

export default recipesSlice.reducer;
