import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Function to fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/papads'); // Use your server URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to create a new product
  const createProduct = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:5000/papads', { // Use your server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Error creating product');
      }

      const createdProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Function to update an existing product
  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:5000/papads/${id}`, { // Use your server URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Error updating product');
      }

      const updatedProducts = products.map((product) =>
        product.productId === id ? { ...product, ...updatedProduct } : product
      );

      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Function to delete a product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/papads/${id}`, { // Use your server URL
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting product');
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, createProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
