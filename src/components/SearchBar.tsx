import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Colors, Fonts } from '../../theme';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={16} />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#8F9098"
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

export default SearchBar;
