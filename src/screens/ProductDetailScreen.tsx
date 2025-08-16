import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import useLoadProducts from '../hooks/useLoadProducts';

export default function ProductDetailScreen({ navigation, route }: any) {
  const productId = route.params.id;

  const { product, loading, fetchProducts } = useLoadProducts();

  useEffect(() => {
    fetchProducts(productId);
  }, []);

  const rememberInCalendar = () => {
    console.log('native call');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={rememberInCalendar(product?.title)}
        >
          <Text style={styles.buttonText}>Remember me to buy it </Text>
        </TouchableOpacity>
      </View>
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
  loading: {
    alignItems: 'center',
    padding: 10,
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
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 16,
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
});
