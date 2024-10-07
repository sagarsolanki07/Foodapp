import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfilePage = () => {
  // Example user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Wholesale St, Business City, BC 12345",
    profilePicture: "https://example.com/profile.jpg", // Replace with a valid image URL
    favoriteItems: [
      { id: '1', name: 'Item 1', image: 'https://example.com/item1.jpg' },
      { id: '2', name: 'Item 2', image: 'https://example.com/item2.jpg' },
      { id: '3', name: 'Item 3', image: 'https://example.com/item3.jpg' },
    ],
  };

  const handleOrderHistory = () => {
    console.log('Navigate to Order History');
  };

  const handleEditProfile = () => {
    console.log('Navigate to Edit Profile');
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Image source={{ uri: item.image }} style={styles.favoriteImage} />
      <Text style={styles.favoriteText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
        <Text style={styles.userPhone}>{userData.phone}</Text>
        <Text style={styles.userAddress}>{userData.address}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Ionicons name="pencil" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOrderHistory}>
        <Ionicons name="list" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Order History</Text>
      </TouchableOpacity>

      <Text style={styles.favoriteItemsTitle}>Favorite Items</Text>
      <FlatList
        data={userData.favoriteItems}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.favoriteItemsContainer}
      />

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  userPhone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  userAddress: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6a11cb',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  favoriteItemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  favoriteItemsContainer: {
    paddingVertical: 10,
  },
  favoriteItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  favoriteImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  favoriteText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  logoutButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FF5733',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
