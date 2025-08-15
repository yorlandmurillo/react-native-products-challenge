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
import useLoadProducts from '../hooks/useLoadProducts';
import { Product } from '../types/product';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = Math.min(320, Math.round(width * 0.88));

export default function HomeScreen({ navigation }: any) {
  const { products, loading, fetchProducts } = useLoadProducts();
  const [productsFetch, setProducts] = useState<Product>();
  const [ratingAsc, setRatingAsc] = useState(true);
  const [priceAsc, setPriceAsc] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (products) {
      setProducts(products);
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

  const pressGoToDetails = (id: number) => {
    navigation.navigate('ProductDetailScreen', { id: id });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          pressGoToDetails(item.id);
        }}
      >
        <View style={styles.leftColumn}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
        </View>

        {/* Columna derecha */}
        <View style={styles.rightColumn}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </TouchableOpacity>
      {/* favorite button */}
    </View>
  );

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={sortByRating}>
          <Text style={styles.buttonText}>Sort By Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sortByPrice}>
          <Text style={styles.buttonText}>Sort by Price</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {/* <View style={styles.logoWrap}> */}

        <FlatList
          //data={products?.slices(0, 4)}
          data={productsFetch}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
      {/* </View> */}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#f5f5f5',
  },
  rightColumn: {
    width: '65%',
    padding: 10,
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
  },
  titleScreen: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#28a745',
  },
});
