import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from '../components/RecipeList';
import FavoritesSearchBar from '../components/FavoritesSearchBar';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';
import { useApp } from '../context/AppContext';
import { fetchUserFavorites, selectFilteredFavoriteRecipes, updateFilteredFavorites } from '../store/favoritesSlice';
import { selectAllRecipes } from '../store/recipesSlice';
import { RootState } from '../store';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { user } = useApp();
  const allRecipes = useSelector(selectAllRecipes);
  const favoriteRecipes = useSelector((state: RootState) => selectFilteredFavoriteRecipes(state));
  const loading = useSelector((state: RootState) => state.favorites.loading);

  useEffect(() => {
    if (user) {
      // @ts-ignore
      dispatch(fetchUserFavorites(user.id));
    }
  }, [dispatch, user]);

  // Ensure filtered favorites are updated when recipes load
  useEffect(() => {
    if (allRecipes.length > 0) {
      dispatch(updateFilteredFavorites({ allRecipes }));
    }
  }, [allRecipes, dispatch]);

  return (
    <NoSafeAreaLayout>
      <FavoritesSearchBar />
      <RecipeList data={favoriteRecipes} />
    </NoSafeAreaLayout>
  );
};

export default FavoritesPage;
