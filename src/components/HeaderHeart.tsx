// src/components/HeaderHeart.tsx
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';
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

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fillAnim = useRef(new Animated.Value(isFavorite ? 1 : 0)).current;

  useEffect(() => {
    if (user && !favoritesLoaded) {
      dispatch(fetchUserFavorites(user.id));
    }
  }, [dispatch, user, favoritesLoaded]);

  // Animate fill state when isFavorite changes
  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: isFavorite ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFavorite, fillAnim]);

  const handleToggleFavorite = () => {
    if (!user) return;

    // Trigger press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();

    if (isFavorite) {
      // @ts-ignore - TypeScript might complain about dispatching async thunk
      dispatch(removeFromFavorites({ userId: user.id, recipeId }));
    } else {
      // @ts-ignore - TypeScript might complain about dispatching async thunk
      dispatch(addToFavorites({ userId: user.id, recipeId }));
    }
  };

  // Interpolate fillAnim for color transitions
  const heartColor = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.error["300"], Colors.error["300"]]
  });

  return (
    <TouchableOpacity
      onPress={handleToggleFavorite}
      style={{ marginRight: Spacing.md }}
      activeOpacity={0.7}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }]
        }}
      >
        {isFavorite ? (
          <Animated.View
            style={{
              transform: [
                { scale: fillAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 1.2, 1]
                }) }
              ]
            }}
          >
            <Ionicons
              name="heart"
              size={24}
              color={Colors.error["300"]}
            />
          </Animated.View>
        ) : (
          <Animated.View>
            <Ionicons
              name="heart-outline"
              size={24}
              color={Colors.error["300"]}
            />
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default HeaderHeart;