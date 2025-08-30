import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../theme';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drinks'];

const Categories = () => {
  const [selected, setSelected] = useState('All');

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, idx) => (
          <TouchableOpacity key={idx} onPress={() => setSelected(category)}>
            <View>
              <Text
                style={[
                  styles.categoryText,
                  selected === category
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
