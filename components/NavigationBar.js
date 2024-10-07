import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedNavigationBar = () => {
  const router = useRouter(); // Initialize the router
  const [activeIndex, setActiveIndex] = useState(0); // Default to 'Home'
  const circlePosition = useRef(new Animated.Value(0)).current;
  const [isNavigating, setIsNavigating] = useState(false); // Track navigation state

  const icons = [
    { name: 'home-outline', route: 'home' },
    { name: 'cart-outline', route: 'cart' },
    { name: 'person-outline', route: 'profile' },
  ];

  useEffect(() => {
    Animated.timing(circlePosition, {
      toValue: activeIndex,
      duration: 200, // Faster animation duration
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [activeIndex]);

  const handlePress = (index) => {
    if (isNavigating) return; // Prevent multiple navigations
    setIsNavigating(true); // Set navigating state

    setActiveIndex(index);
    router.push(icons[index].route); // Navigate to the selected route

    // Reset navigation state after a short delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 50); // Reduced delay for faster responsiveness
  };

  const circleInterpolation = circlePosition.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['16%', '50%', '84%'], // Adjusted to position circle over the correct icon
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Animated Circle */}
        <Animated.View
          style={[
            styles.movingCircle,
            {
              left: circleInterpolation,
            },
          ]}
        >
          <View style={styles.circle}>
            <Ionicons
              name={icons[activeIndex].name} // Display active icon inside the circle
              size={28}
              color="#333" // Active icon color
            />
          </View>
        </Animated.View>

        {/* Navigation Icons */}
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)} // Update the active index and navigate
            style={styles.iconButton}
          >
            <Ionicons
              name={icon.name}
              size={28}
              color={activeIndex === index ? 'transparent' : '#FFF'} // Hide active icon
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 10,
    backgroundColor: '#333',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 10,
    position: 'relative',
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
  },
  movingCircle: {
    position: 'absolute',
    bottom: 25,
    zIndex: 0,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
   backgroundColor: '#786 C3B',
    borderWidth: 5,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});

export default AnimatedNavigationBar;
