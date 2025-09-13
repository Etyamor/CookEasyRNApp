import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getRecipes, getRecipeById } from '../api';
import { RootState } from '.';

export interface Recipe {
  id: string;
  name: string;
  category: string;
  time: number;
  image?: string;
  ingredients: string[];
  steps: string[];
}

interface RecipesState {
  items: Recipe[];
  loading: boolean;
  error: string | null;
  selectedRecipe: Recipe | null;
}

const initialState: RecipesState = {
  items: [],
  loading: false,
  error: null,
  selectedRecipe: null,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await getRecipes();
    return response.data;
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id: string) => {
    const response = await getRecipeById(id);
    return response.data;
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
    filterRecipesByCategory: (state, action: PayloadAction<string>) => {
      // This doesn't modify the actual data, just the view
      // The original data is preserved in the API or server
      if (action.payload === 'All') {
        return;
      }
      state.items = state.items.filter(recipe => recipe.category === action.payload);
    },
    searchRecipes: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      if (!searchTerm) {
        return;
      }
      state.items = state.items.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.category.toLowerCase().includes(searchTerm)
      );
    },
    clearFilters: (state) => {
      // Reset filtered state by fetching all recipes again
      // This is a placeholder - in reality you might want to cache the original list
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action: PayloadAction<Recipe>) => {
        state.loading = false;
        state.selectedRecipe = action.payload;

        // Also update the recipe in the items array if it exists
        const index = state.items.findIndex(recipe => recipe.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipe';
      });
  },
});

// Export actions
export const {
  setSelectedRecipe,
  filterRecipesByCategory,
  searchRecipes,
  clearFilters
} = recipesSlice.actions;

// Export selectors
export const selectAllRecipes = (state: RootState) => state.recipes.items;
export const selectRecipeLoading = (state: RootState) => state.recipes.loading;
export const selectRecipeError = (state: RootState) => state.recipes.error;
export const selectSelectedRecipe = (state: RootState) => state.recipes.selectedRecipe;
export const selectRecipeById = (state: RootState, recipeId: string) =>
  state.recipes.items.find(recipe => recipe.id === recipeId);

export default recipesSlice.reducer;
