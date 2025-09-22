import React, { useState, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { createRecipeThunk } from '../store/recipesSlice';
import FormButton from '../components/FormButton';

const AddPage = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleAddIngredient = useCallback(() => {
    setIngredients(prev => [...prev, '']);
  }, []);

  const handleIngredientChange = useCallback((text, idx) => {
    setIngredients(prev => prev.map((ing, i) => (i === idx ? text : ing)));
  }, []);

  const handleRemoveIngredient = useCallback((idx: number) => {
    setIngredients(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  }, []);

  const handleAddStep = useCallback(() => {
    setSteps(prev => [...prev, '']);
  }, []);

  const handleStepChange = useCallback((text, idx) => {
    setSteps(prev => prev.map((step, i) => (i === idx ? text : step)));
  }, []);

  const handleRemoveStep = useCallback((idx: number) => {
    setSteps(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    if (!name || !category || !time || ingredients.some(i => !i) || steps.some(s => !s)) {
      setError('Please fill all fields.');
      setLoading(false);
      return;
    }
    try {
      const recipe = {
        name,
        category,
        time: Number(time),
        ingredients,
        steps,
      };
      await dispatch(createRecipeThunk(recipe));
      setSuccess(true);
      setName('');
      setCategory('');
      setTime('');
      setIngredients(['']);
      setSteps(['']);
    } catch (e) {
      setError('Failed to create recipe.');
    }
    setLoading(false);
  }, [name, category, time, ingredients, steps, dispatch]);

  return (
    <NoSafeAreaLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Chum salmon"
        />
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="category 1"
        />
        <Text style={styles.label}>Time (min)</Text>
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="65"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Ingredients</Text>
        {ingredients.map((ing, idx) => (
          <View key={idx} style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={ing}
              onChangeText={text => handleIngredientChange(text, idx)}
              placeholder={`Ingredient ${idx + 1}`}
            />
            {ingredients.length > 1 && (
              <Button title="Remove" onPress={() => handleRemoveIngredient(idx)} />
            )}
          </View>
        ))}
        <Button title="Add Ingredient" onPress={handleAddIngredient} />
        <Text style={styles.label}>Steps</Text>
        {steps.map((step, idx) => (
          <View key={idx} style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={step}
              onChangeText={text => handleStepChange(text, idx)}
              placeholder={`Step ${idx + 1}`}
            />
            {steps.length > 1 && (
              <Button title="Remove" onPress={() => handleRemoveStep(idx)} />
            )}
          </View>
        ))}
        <Button title="Add Step" onPress={handleAddStep} />
        <FormButton title={loading ? "Submitting..." : "Submit"} onPress={handleSubmit} disabled={loading} />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        {success ? <Text style={{ color: 'green' }}>Recipe created!</Text> : null}
      </ScrollView>
    </NoSafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default AddPage;
