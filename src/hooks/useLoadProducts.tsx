import { useState } from 'react';
import { Product } from '../types/product';
import { ProductDetail } from '../types/productDetail';

export default function useLoadProducts() {
  const [products, setAllProducts] = useState<Products>();
  const [product, setProduct] = useState<ProductDetail>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const fetchProducts = async (id: any = null) => {
    try {
      setLoading(true);
      const url =
        id == null
          ? `https://dummyjson.com/products`
          : `https://dummyjson.com/products/${id}`;
      const response = await fetch(url);

      const data = await response.json();
      if (id == null) {
        setAllProducts(data?.products);
      } else {
        setProduct(data);
      }

      setLoading(false);
    } catch (err) {
      console.log('Err', err);
      setLoading(false);
      setError(true);
    }
  };

  return { products, product, loading, error, fetchProducts };
}
