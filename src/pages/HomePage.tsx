import React from 'react';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import RecipeList from '../components/RecipeList';
import SafeAreaLayout from '../layouts/SafeAreaLayout';

const HomePage = () => {
  return (
    <SafeAreaLayout>
      <SearchBar />
      <Categories />
      <RecipeList />
    </SafeAreaLayout>
  );
};

export default HomePage;
