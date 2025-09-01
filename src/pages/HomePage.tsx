import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import RecipeList from '../components/RecipeList';
import SafeAreaLayout from '../layouts/SafeAreaLayout';
import { useApp } from '../context/AppContext';

const HomePage = () => {
  const { recipes, refreshRecipes } = useApp();

  useEffect(() => {
    refreshRecipes();
  }, []);

  return (
    <SafeAreaLayout>
      <SearchBar />
      <Categories />
      <RecipeList data={recipes} />
    </SafeAreaLayout>
  );
};

export default HomePage;
