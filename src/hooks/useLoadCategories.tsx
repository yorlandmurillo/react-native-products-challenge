import { useState } from 'react';
import { Categories } from '../types/categories';

export default function useLoadCategories() {
  const [categories, setAllCategories] = useState<Categories>();
  const [loadingCategories, setLoading] = useState(true);
  const [errorCategories, setError] = useState(true);

  const fetchCategories = async (id: any = null) => {
    try {
      setLoading(true);
      const url = `https://dummyjson.com/products/categories`;
      const response = await fetch(url);

      const data = await response.json();
      setAllCategories(data?.products);

      setLoading(false);
    } catch (err) {
      console.log('Err', err);
      setLoading(false);
      setError(true);
    }
  };

  return { categories, loadingCategories, errorCategories, fetchCategories };
}
