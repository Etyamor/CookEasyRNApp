import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite, getUserById } from '../api';
import { RootState } from '.';

interface FavoritesState {
  ids: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  ids: [],
  loading: false,
  error: null,
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

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.ids = [];
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
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch favorites';
      })
      .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.ids = action.payload;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.ids = action.payload;
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;

// Selectors
export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectFavoriteLoading = (state: RootState) => state.favorites.loading;
export const selectFavoriteRecipes = (state: RootState) => {
  const favoriteIds = state.favorites.ids;
  return state.recipes.items.filter(recipe => favoriteIds.includes(recipe.id));
};
export const selectIsFavorite = (state: RootState, recipeId: string) =>
  state.favorites.ids.includes(recipeId);

export default favoritesSlice.reducer;
