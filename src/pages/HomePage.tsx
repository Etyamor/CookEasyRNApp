import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import RecipeList from '../components/RecipeList';
import SafeAreaLayout from '../layouts/SafeAreaLayout';
import { fetchRecipes, selectFilteredRecipes } from '../store/recipesSlice';
import { RootState } from '../store';

const HomePage = () => {
  const dispatch = useDispatch();
  const filteredRecipes = useSelector((state: RootState) => selectFilteredRecipes(state));

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <SafeAreaLayout>
      <SearchBar />
      <Categories />
      <RecipeList data={filteredRecipes} />
    </SafeAreaLayout>
  );
};

export default HomePage;
