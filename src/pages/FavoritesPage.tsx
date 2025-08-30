import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';

const FavoritesPage = () => {
  return (
    <NoSafeAreaLayout>
      <SearchBar />
      <RecipeList />
    </NoSafeAreaLayout>
  );
};

export default FavoritesPage;
