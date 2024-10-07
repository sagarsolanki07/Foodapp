import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CartScreen = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.cartImage} />
        <View style={styles.cartDetails}>
          <Text style={styles.cartTitle}>{item.name}</Text>
          <Text style={styles.cartPrice}>₹{item.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={[styles.quantityButton, item.quantity === 1 && styles.disabledButton]} 
              onPress={() => decreaseQuantity(item.productid)}
              disabled={item.quantity === 1}
            >
              <Icon name="remove" size={20} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => increaseQuantity(item.productid)}
            >
              <Icon name="add" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={() => handleRemove(item.productid)}
          >
            <Icon name="delete" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleRemove = (productId) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => removeFromCart(productId) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Cart</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.productid.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      )}
      {cartItems.length > 0 && (
        <View style={styles.clearCartContainer}>
          <TouchableOpacity style={styles.clearCartButton} onPress={clearCart}>
            <Text style={styles.clearCartButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('checkoutScreen')}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  cartImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cartDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cartPrice: {
    fontSize: 16,
    color: '#FF5722',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityButton: {
    backgroundColor: '#FF6B6B',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
  },
  removeButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    padding: 5,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FF6B6B',
    marginTop: 50,
  },
  totalContainer: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  clearCartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  clearCartButton: {
    backgroundColor: '#FF3D00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  clearCartButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
