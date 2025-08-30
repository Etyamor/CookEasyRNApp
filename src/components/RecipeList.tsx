import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cardContainer}>
          {Array.from({ length: 12 }, (_, index) => (
            <RecipeCard key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    gap: 16,
  },
});

export default RecipeList;
