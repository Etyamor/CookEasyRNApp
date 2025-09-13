import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite, getUserById } from '../api';
import { RootState } from '.';

interface FavoritesState {
  ids: string[];
  filteredIds: string[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: FavoritesState = {
  ids: [],
  filteredIds: [],
  loading: false,
  error: null,
  searchQuery: '',
};

export const fetchUserFavorites = createAsyncThunk(
  'favorites/fetchUserFavorites',
  async (userId: string) => {
    const response = await getUserById(userId);
    return response.data.favorites || [];
  }
);

export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorite',
  async ({ userId, recipeId }: { userId: string; recipeId: string }) => {
    const response = await addFavorite(userId, recipeId);
    return response.data.favorites;
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorite',
  async ({ userId, recipeId }: { userId: string; recipeId: string }) => {
    const response = await removeFavorite(userId, recipeId);
    return response.data.favorites;
  }
);

// Helper function to filter favorite ids based on search query
const filterFavoritesBySearch = (allRecipes: any[], favoriteIds: string[], searchQuery: string): string[] => {
  if (!searchQuery) {
    return favoriteIds;
  }

  const query = searchQuery.toLowerCase();
  const matchingRecipes = allRecipes.filter(recipe =>
    (recipe.name.toLowerCase().includes(query) || recipe.category.toLowerCase().includes(query)) &&
    favoriteIds.includes(recipe.id)
  );

  return matchingRecipes.map(recipe => recipe.id);
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.ids = [];
      state.filteredIds = [];
      state.searchQuery = '';
    },
    setFavoritesSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    updateFilteredFavorites: (state, action: PayloadAction<{ allRecipes: any[] }>) => {
      state.filteredIds = filterFavoritesBySearch(
        action.payload.allRecipes,
        state.ids,
        state.searchQuery
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.ids = action.payload;
        state.filteredIds = action.payload; // Initially, filtered ids are the same as all ids
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch favorites';
      })
      .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.ids = action.payload;
        // Keep any existing search filters
        if (state.searchQuery) {
          // We'll need to update filteredIds with the updateFilteredFavorites action
        } else {
          state.filteredIds = action.payload;
        }
      })
      .addCase(removeFromFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.ids = action.payload;
        // Keep any existing search filters
        if (state.searchQuery) {
          // We'll need to update filteredIds with the updateFilteredFavorites action
        } else {
          state.filteredIds = action.payload;
        }
      });
  },
});

export const { clearFavorites, setFavoritesSearchQuery, updateFilteredFavorites } = favoritesSlice.actions;

// Selectors
export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectFilteredFavoriteIds = (state: RootState) => state.favorites.filteredIds;
export const selectFavoriteLoading = (state: RootState) => state.favorites.loading;
export const selectFavoritesSearchQuery = (state: RootState) => state.favorites.searchQuery;

// Get all favorite recipes
export const selectFavoriteRecipes = (state: RootState) => {
  const favoriteIds = state.favorites.ids;
  return state.recipes.allItems.filter(recipe => favoriteIds.includes(recipe.id));
};

// Get filtered favorite recipes based on search
export const selectFilteredFavoriteRecipes = (state: RootState) => {
  const filteredIds = state.favorites.filteredIds;
  return state.recipes.allItems.filter(recipe => filteredIds.includes(recipe.id));
};

export const selectIsFavorite = (state: RootState, recipeId: string) =>
  state.favorites.ids.includes(recipeId);

export default favoritesSlice.reducer;
