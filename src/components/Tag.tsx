import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts } from '../../theme';

const Tag = ({ tag }: { tag: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{tag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue['100'],
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: Fonts.inter,
    fontWeight: '700',
    fontSize: 10,
    color: Colors.blue['500'],
  },
});

export default Tag;
