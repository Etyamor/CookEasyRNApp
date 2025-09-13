import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';
import { useApp } from '../context/AppContext';
import { fetchUserFavorites, selectFavoriteRecipes } from '../store/favoritesSlice';
import { RootState } from '../store';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { user } = useApp();
  const favoriteRecipes = useSelector((state: RootState) => selectFavoriteRecipes(state));

  useEffect(() => {
    if (user) {
      // @ts-ignore
      dispatch(fetchUserFavorites(user.id));
    }
  }, [dispatch, user]);

  return (
    <NoSafeAreaLayout>
      <SearchBar />
      <RecipeList data={favoriteRecipes} />
    </NoSafeAreaLayout>
  );
};

export default FavoritesPage;
