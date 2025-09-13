// src/components/HeaderHeart.tsx
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Colors, Spacing } from '../../theme';
import { useApp } from '../context/AppContext';
import { addToFavorites, removeFromFavorites, selectIsFavorite, fetchUserFavorites } from '../store/favoritesSlice';
import { RootState } from '../store';

type HeaderHeartProps = {
  recipeId: string;
};

const HeaderHeart = ({ recipeId }: HeaderHeartProps) => {
  const dispatch = useDispatch();
  const { user } = useApp();
  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, recipeId));
  const favoritesLoaded = useSelector((state: RootState) => state.favorites.ids.length > 0 || state.favorites.loading);

  // Load favorites when component mounts if they haven't been loaded yet
  useEffect(() => {
    if (user && !favoritesLoaded) {
      // @ts-ignore - TypeScript might complain about dispatching async thunk
      dispatch(fetchUserFavorites(user.id));
    }
  }, [dispatch, user, favoritesLoaded]);

  const handleToggleFavorite = () => {
    if (!user) return;

    if (isFavorite) {
      // @ts-ignore - TypeScript might complain about dispatching async thunk
      dispatch(removeFromFavorites({ userId: user.id, recipeId }));
    } else {
      // @ts-ignore - TypeScript might complain about dispatching async thunk
      dispatch(addToFavorites({ userId: user.id, recipeId }));
    }
  };

  return (
    <TouchableOpacity
      onPress={handleToggleFavorite}
      style={{ marginRight: Spacing.md }}
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={24}
        color={Colors.error["300"]}
      />
    </TouchableOpacity>
  );
};

export default HeaderHeart;