import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

const ProductItem = ({ item, navigation }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const scaleValue = new Animated.Value(1);
        
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      Alert.alert(
        'Item Already in Cart',
        `You already have ${existingItem.quantity} of ${item.name} in your cart. Do you want to add another one?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              addToCart({ ...existingItem, quantity: existingItem.quantity + 1 });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      addToCart({ ...item, quantity: 1 });
    }
  };

  const goToProductDetails = () => {
    navigation.navigate('ProductDetails', {
      name: item.name,
      image: item.image,
      description: item.description,
    });
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}
        onPress={goToProductDetails}
        onPressIn={handlePress}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartIcon} onPress={handleAddToCart}>
          <Ionicons name="cart" size={28} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#FFB74D',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  itemPrice: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
  },
  addToCartIcon: {
    backgroundColor: '#FF7043',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});

export default ProductItem;
