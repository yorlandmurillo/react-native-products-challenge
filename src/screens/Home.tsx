import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import CategoriesFilter from '../components/CategoriesFilter';
import ProductItem from '../components/ProductItem';
import useLoadProducts from '../hooks/useLoadProducts';
import { Product, Products } from '../types/product';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const { products, loading, fetchProducts } = useLoadProducts();
  const [productsFetch, setProducts] = useState<Products>();
  const [ratingAsc, setRatingAsc] = useState(true);
  const [priceAsc, setPriceAsc] = useState(true);
  const [selectedCat, setSelectedCat] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (products) {
      sortCleared();
    }
  }, [products]);

  const sortByRating = () => {
    const sorted = [...products].sort((a, b) =>
      ratingAsc
        ? parseFloat(a.rating) - parseFloat(b.rating)
        : parseFloat(b.rating) - parseFloat(a.rating)
    );
    setProducts(sorted);
    setRatingAsc(!ratingAsc);
  };

  const sortByPrice = () => {
    const sorted = [...products].sort((a, b) =>
      priceAsc
        ? parseFloat(a.price) - parseFloat(b.price)
        : parseFloat(b.price) - parseFloat(a.price)
    );
    setProducts(sorted);
    setPriceAsc(!priceAsc);
  };

  const sortFilterCleaner = () => {
    setProducts(products);
    setSelectedCat('');
  };

  const pressGoToDetails = (id: number) => {
    navigation.navigate('ProductDetailScreen', { id: id });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductItem item={item} pressGoToDetails={pressGoToDetails} />
  );

  const onSelectCategory = (cat: string) => {
    setSelectedCat(cat);
    const productsFiltered = products?.filter(
      (item: Product) => cat === item.category
    );
    setProducts(productsFiltered);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.titleScreen}>Products</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={sortByRating}>
          <Text style={styles.buttonText}>Sort By Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sortByPrice}>
          <Text style={styles.buttonText}>Sort by Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sortFilterCleaner}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View>
        <CategoriesFilter
          onSelectCategory={onSelectCategory}
          selectedCat={selectedCat}
          setSelectedCat={setSelectedCat}
        ></CategoriesFilter>
      </View>
      <View style={styles.container}>
        <FlatList
          data={productsFetch}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  list: {
    padding: 16,
  },
  loading: {
    alignItems: 'center',
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#006a61',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  titleScreen: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
