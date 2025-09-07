import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Tag from '../components/Tag';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';
import { Colors, Fonts, Spacing } from '../../theme';

const DetailsPage = () => {
  const route = useRoute();
  const recipe = route.params?.recipe || {};

  return (
    <NoSafeAreaLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://picsum.photos/480/270' }}
            style={styles.image}
          />
          <Text style={styles.h1}>{recipe.name || 'Recipe name'}</Text>
          <View style={styles.tagsContainer}>
            <Tag tag={recipe.category || 'Category'} />
            <Tag tag={recipe.time ? `${recipe.time} minutes` : 'Time'} />
          </View>
          {!!recipe.ingredients && recipe.ingredients.length > 0 && (
            <View>
              <Text style={styles.h2}>Ingredients</Text>
              <View>
                {recipe.ingredients.map((item: string, idx: number) => (
                  <Text key={item + idx} style={styles.p}>
                    {`\u2022`} {item}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {!!recipe.steps && recipe.steps.length > 0 && (
            <View style={[styles.container, styles.stepsContainer]}>
              <Text style={styles.h2}>Steps</Text>
              <View>
                {recipe.steps.map((item: string, idx: number) => (
                  <View key={item + idx} style={{ marginBottom: Spacing.sm }}>
                    <Text style={styles.h3}>{`Step ${idx + 1}`}</Text>
                    <Text style={styles.p}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </NoSafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spacing.md,
  },
  image: {
    height: 200,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  h1: {
    fontFamily: Fonts.inter,
    fontWeight: 'bold',
    fontSize: 18,
  },
  h2: {
    fontFamily: Fonts.inter,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: Spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  p: {
    fontFamily: Fonts.inter,
    fontSize: 12,
    color: Colors.dark['200'],
    textAlign: 'justify',
  },
  stepsContainer: {
    gap: Spacing.md,
  },
  h3: {
    fontFamily: Fonts.inter,
    fontSize: 14,
    marginBottom: Spacing.xs,
    color: Colors.dark['500'],
  },
});

export default DetailsPage;
