import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';
import { useApp } from '../context/AppContext';

const FavoritesPage = () => {
  const { getFavorites } = useApp();
  const favoriteRecipes = getFavorites();

  return (
    <NoSafeAreaLayout>
      <SearchBar />
      <RecipeList data={favoriteRecipes} />
    </NoSafeAreaLayout>
  );
};

export default FavoritesPage;
