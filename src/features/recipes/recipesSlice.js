import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRecipesAPI, searchRecipesAPI, getRecipeByIdAPI, createRecipeAPI } from './recipesAPI';

// Async thunks
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

// Import images
import eggCurryImage from '../../assets/images/download (2).jpeg';
import nyamaCromaImage from '../../assets/images/download (1).jpeg';
import matokeImage from '../../assets/images/download.jpeg';

// Sample Kenyan recipes to display initially
const initialKenyanRecipes = [
  {
    _id: 'kenyan-1',
    title: 'Egg Curry',
    description: 'A delicious Kenyan-style egg curry with aromatic spices and coconut milk',
    image: eggCurryImage,
    rating: 4.5,
    cookingTime: '30 minutes',
    servings: 4,
    ingredients: [
      '6 hard-boiled eggs',
      '2 medium onions, finely chopped',
      '3 tomatoes, chopped',
      '3 cloves garlic, minced',
      '1 inch ginger, grated',
      '2 tsp curry powder',
      '1 tsp cumin powder',
      '1 tsp coriander powder',
      '1/2 tsp turmeric powder',
      '1/2 tsp red chili powder',
      '400ml coconut milk',
      '2 tbsp vegetable oil',
      'Salt to taste',
      'Fresh coriander leaves for garnish'
    ],
    instructions: [
      'Heat oil in a large pan over medium heat.',
      'Add chopped onions and sauté until golden brown.',
      'Add minced garlic and grated ginger, cook for 1 minute.',
      'Add all the spice powders (curry, cumin, coriander, turmeric, chili) and cook for 30 seconds.',
      'Add chopped tomatoes and cook until they break down and form a thick sauce.',
      'Pour in coconut milk and bring to a gentle simmer.',
      'Carefully add the hard-boiled eggs to the curry.',
      'Simmer for 10-15 minutes until the sauce thickens.',
      'Season with salt to taste.',
      'Garnish with fresh coriander leaves and serve hot with rice or chapati.'
    ],
    category: 'Main Course',
    cuisine: 'Kenyan'
  },
  {
    _id: 'kenyan-2',
    title: 'Nyama Choma',
    description: 'Traditional Kenyan grilled meat, perfectly seasoned and cooked over open fire',
    image: nyamaCromaImage,
    rating: 4.8,
    cookingTime: '45 minutes',
    servings: 6,
    ingredients: [
      '2 kg beef or goat meat, cut into chunks',
      '2 tsp salt',
      '1 tsp black pepper',
      '2 tsp garlic powder',
      '1 tsp ginger powder',
      '2 tsp curry powder',
      '1 tsp paprika',
      '2 tbsp vegetable oil',
      '2 lemons, juiced',
      '2 large onions, sliced',
      'Fresh tomatoes for serving',
      'Ugali for serving'
    ],
    instructions: [
      'Cut the meat into medium-sized chunks and wash thoroughly.',
      'In a bowl, mix salt, black pepper, garlic powder, ginger powder, curry powder, and paprika.',
      'Rub the spice mixture all over the meat pieces.',
      'Drizzle with oil and lemon juice, then marinate for at least 30 minutes.',
      'Prepare your grill or jiko (charcoal brazier) and let the coals get hot.',
      'Thread the meat onto skewers or place directly on the grill.',
      'Grill the meat, turning frequently, for about 30-40 minutes until well cooked.',
      'Add sliced onions to the grill in the last 10 minutes.',
      'The meat should develop a nice crust and be tender inside.',
      'Serve hot with ugali, grilled onions, and fresh tomatoes.',
      'Traditionally enjoyed with friends and family!'
    ],
    category: 'Main Course',
    cuisine: 'Kenyan'
  },
  {
    _id: 'kenyan-3',
    title: 'Matoke',
    description: 'Traditional Kenyan green banana stew cooked with meat and vegetables',
    image: matokeImage,
    rating: 4.3,
    cookingTime: '40 minutes',
    servings: 5,
    ingredients: [
      '8-10 green bananas (matoke), peeled and cut',
      '500g beef or chicken, cut into pieces',
      '2 medium onions, chopped',
      '3 tomatoes, chopped',
      '3 cloves garlic, minced',
      '1 inch ginger, grated',
      '2 tsp curry powder',
      '1 tsp cumin powder',
      '1/2 tsp turmeric powder',
      '2 bay leaves',
      '3 tbsp vegetable oil',
      '2 cups beef or chicken stock',
      'Salt and pepper to taste',
      'Fresh dhania (coriander) for garnish'
    ],
    instructions: [
      'Heat oil in a large sufuria (cooking pot) over medium heat.',
      'Add the meat pieces and brown them on all sides.',
      'Add chopped onions and cook until softened.',
      'Add minced garlic and grated ginger, cook for 1 minute.',
      'Add all spices (curry powder, cumin, turmeric) and stir for 30 seconds.',
      'Add chopped tomatoes and bay leaves, cook until tomatoes soften.',
      'Add the cut matoke pieces to the pot.',
      'Pour in stock to barely cover the ingredients.',
      'Bring to a boil, then reduce heat and simmer covered for 25-30 minutes.',
      'Stir occasionally and add more stock if needed.',
      'Cook until matoke is tender and meat is well cooked.',
      'Season with salt and pepper to taste.',
      'Garnish with fresh dhania and serve hot.',
      'Perfect with rice or chapati.'
    ],
    category: 'Main Course',
    cuisine: 'Kenyan'
  }
];

const initialState = {
  items: initialKenyanRecipes,
  currentRecipe: null,
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
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
  },
  extraReducers: (builder) => {
    builder
      // Fetch all recipes
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
      
      // Search recipes
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
      
      // Fetch recipe by ID
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
      
      // Create recipe
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentRecipe, clearSearchResults } = recipesSlice.actions;
export default recipesSlice.reducer;