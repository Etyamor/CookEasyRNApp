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
  allItems: Recipe[]; // Original unfiltered list
  filteredItems: Recipe[]; // Filtered list for display
  loading: boolean;
  error: string | null;
  selectedRecipe: Recipe | null;
  activeCategory: string;
  searchQuery: string;
}

const initialState: RecipesState = {
  allItems: [],
  filteredItems: [],
  loading: false,
  error: null,
  selectedRecipe: null,
  activeCategory: 'All',
  searchQuery: '',
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

// Helper function to apply filters to the recipe list
const applyFilters = (
  recipes: Recipe[],
  category: string,
  searchQuery: string
): Recipe[] => {
  let result = [...recipes];

  // Apply category filter if it's not 'All'
  if (category !== 'All') {
    result = result.filter(recipe => recipe.category === category);
  }

  // Apply search filter if there's a search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(recipe =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.category.toLowerCase().includes(query)
    );
  }

  return result;
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
      // Apply both filters
      state.filteredItems = applyFilters(
        state.allItems,
        action.payload,
        state.searchQuery
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      // Apply both filters
      state.filteredItems = applyFilters(
        state.allItems,
        state.activeCategory,
        action.payload
      );
    },
    clearFilters: (state) => {
      state.activeCategory = 'All';
      state.searchQuery = '';
      state.filteredItems = [...state.allItems];
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
        state.allItems = action.payload;
        // Apply any existing filters to the new data
        state.filteredItems = applyFilters(
          action.payload,
          state.activeCategory,
          state.searchQuery
        );
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

        // Also update the recipe in the allItems array if it exists
        const index = state.allItems.findIndex(recipe => recipe.id === action.payload.id);
        if (index !== -1) {
          state.allItems[index] = action.payload;
        } else {
          state.allItems.push(action.payload);
        }

        // Re-apply filters after updating the recipe
        state.filteredItems = applyFilters(
          state.allItems,
          state.activeCategory,
          state.searchQuery
        );
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
  setCategory,
  setSearchQuery,
  clearFilters
} = recipesSlice.actions;

// Export selectors
export const selectAllRecipes = (state: RootState) => state.recipes.allItems;
export const selectFilteredRecipes = (state: RootState) => state.recipes.filteredItems;
export const selectRecipeLoading = (state: RootState) => state.recipes.loading;
export const selectRecipeError = (state: RootState) => state.recipes.error;
export const selectSelectedRecipe = (state: RootState) => state.recipes.selectedRecipe;
export const selectActiveCategory = (state: RootState) => state.recipes.activeCategory;
export const selectSearchQuery = (state: RootState) => state.recipes.searchQuery;
export const selectRecipeById = (state: RootState, recipeId: string) =>
  state.recipes.allItems.find(recipe => recipe.id === recipeId);

export default recipesSlice.reducer;
