import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported

const SignupPage = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [isGuest, setIsGuest] = useState(false);
  const scaleAnim = new Animated.Value(1); // Initial scale value for animations

  useEffect(() => {
    const checkGuestStatus = async () => {
      const guestStatus = await AsyncStorage.getItem('isGuest');
      if (guestStatus === 'true') {
        navigation.navigate('home'); // Ensure 'home' matches your route name
      }
    };
    checkGuestStatus();
  }, [navigation]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = async (targetScreen) => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start(async () => {
      if (targetScreen === 'home') {
        setIsGuest(true);
        await AsyncStorage.setItem('isGuest', 'true'); // Store guest status
      }
      // Ensure navigation reset matches the correct targetScreen
      navigation.reset({
        index: 0,
        routes: [{ name: targetScreen }], // Ensure targetScreen matches route names in _layout.tsx
      });
    });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1601098242897-29ef1cf93d40' }} // Background image
      style={styles.background}
    >
      <View style={styles.container}>
        <Animated.Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/React-icon.svg' }} // Logo image
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]} // Apply scaling animation
        />
        <Text style={styles.title}>Welcome to Drashti Foods</Text>
        <TouchableOpacity 
          style={styles.guestButton} 
          onPressIn={handlePressIn} 
          onPressOut={() => handlePressOut('home')} // Navigate to Home page
        >
          <Text style={styles.buttonText}>Continue As Guest</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPressIn={handlePressIn} 
          onPressOut={() => handlePressOut('login')} // Navigate to Login page
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly opaque background
    borderRadius: 20,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333', // Darker color for better contrast
    marginBottom: 30,
    textAlign: 'center', // Centered text
  },
  guestButton: {
    backgroundColor: '#ffffff', // White background
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded corners
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd', // Light border color
    elevation: 3, // Button shadow
    width: '100%', // Full width for the button
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  loginButton: {
    backgroundColor: '#ff6f00', // Darker orange for better contrast
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded corners
    elevation: 3, // Button shadow
    width: '100%', // Full width for the button
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  buttonText: {
    fontSize: 20, // Increased font size for better visibility
    color: '#333', // Darker color for better contrast
    textAlign: 'center',
    fontWeight: '700', // Bold text
    letterSpacing: 1, // Added letter spacing for readability
  },
});

export default SignupPage;
