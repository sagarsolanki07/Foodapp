import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard'; // Import ProductCard component

const HomeScreen = () => {
  const navigation = useNavigation();
  const { cartItems, addToCart } = useContext(CartContext);

  const [data, setData] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Function to fetch product data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.97.8:5000/papads'); // Update URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when component mounts
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.heroText}>Welcome to Drashti Foods</Text>
        <Text style={styles.heroSubText}>Delicious Papad and Fryms at your doorstep!</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ProductCard 
            item={item} 
            handleAddToCart={() => addToCart(item)} // Updated to use handleAddToCart
            goToProductDetails={() => navigation.navigate('ProductDetails', { productId: item.productId })} // Navigate to product details
          />
        )}
        keyExtractor={item => item.productid.toString()} // Use productId as the key
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 20,
    justifyContent: 'flex-start',
  },
  heroSection: {
    backgroundColor: '#FFCC80',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heroText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubText: {
    fontSize: 16,
    color: '#5D4037',
    textAlign: 'center',
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
