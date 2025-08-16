import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import useLoadCategories from '../hooks/useLoadCategories';

const CategoriesFilter = ({ onSelectCategory, selectedCat }: any) => {
  const { categories, fetchCategories } = useLoadCategories();

  useEffect(() => {
    fetchCategories();
  }, []);
  const handleSelect = (cat: string) => {
    onSelectCategory(cat);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item: any) => item.slug}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={[
              styles.pill,
              selectedCat === item.slug && styles.selectedChip,
            ]}
            onPress={() => handleSelect(item.slug)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCat === item.slug && styles.selectedText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  chipText: { fontSize: 14, color: '#333' },
  selectedChip: {
    backgroundColor: '#006a61',
  },
  selectedText: { color: '#fff' },
});

export default CategoriesFilter;
