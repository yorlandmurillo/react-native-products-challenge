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
import { Product } from '../types/product';
import { ProductDetail } from '../types/productDetail';

export default function ProductDetailScreen({ navigation, route }: any) {
  const productId = route.params.id;

  const { product, loading, fetchProducts } = useLoadProducts();

  useEffect(() => {
    fetchProducts(productId);
  }, []);

  // const ProductDetail: React.FC<ProductDetail> = ({ product }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Imagen principal */}
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      {/* Título y precio */}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.discount}>-{product.discountPercentage}% OFF</Text>

      {/* Descripción */}
      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* Info adicional */}
      <Text style={styles.sectionTitle}>Detalles</Text>
      <Text>Marca: {product.brand}</Text>
      <Text>Categoría: {product.category}</Text>
      <Text>Stock: {product.stock}</Text>
      <Text>Disponibilidad: {product.availabilityStatus}</Text>
      <Text>Garantía: {product.warrantyInformation}</Text>
      <Text>Envío: {product.shippingInformation}</Text>

      {/* Reviews */}
      <Text style={styles.sectionTitle}>Reseñas</Text>
      <FlatList
        data={product.reviews}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.review}>
            <Text style={styles.reviewer}>{item.reviewerName}</Text>
            <Text>⭐ {item.rating}</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 16 },
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
  reviewer: { fontWeight: 'bold' },
});
