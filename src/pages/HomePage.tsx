import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import RecipeList from '../components/RecipeList';
import SafeAreaLayout from '../layouts/SafeAreaLayout';
import { fetchRecipes, selectAllRecipes } from '../store/recipesSlice';
import { RootState } from '../store';

const HomePage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => selectAllRecipes(state));

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <SafeAreaLayout>
      <SearchBar />
      <Categories />
      <RecipeList data={recipes} />
    </SafeAreaLayout>
  );
};

export default HomePage;
