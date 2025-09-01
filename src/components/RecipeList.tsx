import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import RecipeCard from './RecipeCard';
import { Spacing } from '../../theme';

const RecipeList = ({ data }: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cardContainer}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    gap: Spacing.md,
  },
});

export default RecipeList;
