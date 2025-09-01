// src/components/HeaderHeart.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Colors, Spacing } from '../../theme';
import { useApp } from '../context/AppContext';

type HeaderHeartProps = {
  recipeId: string;
};

const HeaderHeart = ({ recipeId }: HeaderHeartProps) => {
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(recipeId);

  return (
    <TouchableOpacity
      onPress={() => toggleFavorite(recipeId)}
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