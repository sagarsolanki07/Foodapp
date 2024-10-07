import React from 'react';
import { Stack, usePathname } from 'expo-router';
import NavigationBar from '../components/NavigationBar';
import { AuthProvider } from '@/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ProductProvider } from '../context/ProductContext';

function AppLayout() {
  const currentPath = usePathname(); // Get the current route path

  // Ensure you're checking the right path format by logging the current path
  console.log("Current Path:", currentPath);

  return (  
    <>
      <Stack>
        {/* Define the routes and ensure header is hidden where needed */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signupPage" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="checkoutScreen" options={{ headerShown: false }} />
      </Stack>

      {/* Show NavigationBar only when not on index, signupPage, or login */}
      {currentPath !== '/' && currentPath !== '/signupPage' && currentPath !== '/login' && (
        <NavigationBar />
      )}
    </>
  );
}

export default function RootLayout() {
  return (
      // <ProductProvider>
    <AuthProvider>

       <CartProvider>

      <AppLayout />
       </CartProvider>
    </AuthProvider>
      // </ProductProvider>
  );
}
