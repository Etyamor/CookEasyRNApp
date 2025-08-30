import React from 'react';
import { Image, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Colors, Fonts, Spacing } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const RecipeCard = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('DetailsPage');
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <View>
          <Image
            source={{ uri: 'https://picsum.photos/80/80' }}
            style={styles.image}
          />
        </View>
        <View style={styles.contentRow}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Recipe Title</Text>
            <Text style={styles.time}>20 min</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8F9098" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 70,
    borderRadius: Spacing.md,
    backgroundColor: Colors.blue['100'],
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 70,
    flexShrink: 0,
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  textContainer: {
    gap: Spacing.xs,
  },
  title: {
    fontFamily: Fonts.inter, fontWeight: "700",
    fontSize: 14,
    color: Colors.dark['500'],
  },
  time: {
    fontFamily: Fonts.inter,
    fontSize: 12,
    color: Colors.dark['200'],
  },
});

export default RecipeCard;
