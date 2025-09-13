import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Colors, Fonts } from '../../theme';
import {
  setFavoritesSearchQuery,
  selectFavoritesSearchQuery,
  updateFilteredFavorites
} from '../store/favoritesSlice';
import { selectAllRecipes } from '../store/recipesSlice';

const FavoritesSearchBar = () => {
  const dispatch = useDispatch();
  const currentSearchQuery = useSelector(selectFavoritesSearchQuery);
  const allRecipes = useSelector(selectAllRecipes);
  const [searchText, setSearchText] = useState(currentSearchQuery);

  const handleSearch = (text: string) => {
    setSearchText(text);
    dispatch(setFavoritesSearchQuery(text));
    dispatch(updateFilteredFavorites({ allRecipes }));
  };

  // When recipes load or change, re-apply search filter
  useEffect(() => {
    if (allRecipes.length > 0) {
      dispatch(updateFilteredFavorites({ allRecipes }));
    }
  }, [allRecipes, dispatch]);

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={16} />
      <TextInput
        style={styles.input}
        placeholder="Search favorites..."
        placeholderTextColor="#8F9098"
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: Colors.light['200'],
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.dark['500'],
    fontFamily: Fonts.inter,
  },
});

export default FavoritesSearchBar;
