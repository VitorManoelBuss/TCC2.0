import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductContext = createContext();
export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    // Adicione seus produtos aqui
    { id: '1', name: 'Produto 1', stock: 10, price: 10.0 },
    { id: '2', name: 'Produto 2', stock: 15, price: 15.0 },
  ]);

  const [soldProducts, setSoldProducts] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem('products');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const saveProducts = async () => {
      try {
        await AsyncStorage.setItem('products', JSON.stringify(products));
      } catch (error) {
        console.error('Erro ao salvar produtos:', error);
      }
    };

    saveProducts();
  }, [products]);

  const addProduct = (productData) => {
    setProducts([...products, productData]);
  };

  const removeProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, soldProducts, setSoldProducts }}>
      {children}
    </ProductContext.Provider>
  );
};