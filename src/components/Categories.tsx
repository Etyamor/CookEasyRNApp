import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../theme';
import { setCategory, selectActiveCategory } from '../store/recipesSlice';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drinks'];

const Categories = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectActiveCategory);

  const handleCategorySelect = (category: string) => {
    dispatch(setCategory(category));
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handleCategorySelect(category)}
          >
            <View>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category
                    ? styles.selectedCategory
                    : styles.unselectedCategory,
                ]}
              >
                {category}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
  },
  categoryText: {
    paddingVertical: 8,
    fontSize: 14,
    width: 80,
    textAlign: 'center',
  },
  selectedCategory: {
    fontWeight: '700',
    color: Colors.dark['500'],
  },
  unselectedCategory: {
    fontWeight: '400',
    color: Colors.dark['200'],
  },
});

export default Categories;
