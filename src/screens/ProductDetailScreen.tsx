import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import useLoadProducts from '../hooks/useLoadProducts';

export default function ProductDetailScreen({ navigation, route }: any) {
  const productId = route.params.id;

  const { product, loading, fetchProducts } = useLoadProducts();

  useEffect(() => {
    fetchProducts(productId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerImg}>
        <Image source={{ uri: product?.thumbnail }} style={styles.image} />
      </View>

      <Text style={styles.title}>{product?.title}</Text>
      <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
      <Text style={styles.discount}>-{product?.discountPercentage}% OFF</Text>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{product?.description}</Text>

      <Text style={styles.sectionTitle}>Details</Text>
      <Text>
        <Text style={styles.bold}>Brand:</Text> {product?.brand}
      </Text>
      <Text>
        <Text style={styles.bold}>Category: </Text>
        {product?.category}
      </Text>
      <Text>
        <Text style={styles.bold}>Stock:</Text> {product?.stock}
      </Text>
      <Text>
        <Text style={styles.bold}>Availability:</Text>{' '}
        {product?.availabilityStatus}
      </Text>
      <Text>
        <Text style={styles.bold}>Warranty: </Text>
        {product?.warrantyInformation}
      </Text>
      <Text>
        <Text style={styles.bold}>Shipping: </Text>
        {product?.shippingInformation}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  containerImg: {
    alignItems: 'center',
  },
  image: {
    width: '65%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 18, color: 'green', marginBottom: 4 },
  discount: { fontSize: 14, color: 'red', marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  description: { fontSize: 14, lineHeight: 20 },
  review: {
    marginBottom: 12,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  bold: { fontWeight: 'bold' },
});
