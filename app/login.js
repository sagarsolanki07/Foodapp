import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// Initialize web browser for authentication
WebBrowser.maybeCompleteAuthSession();

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('screen');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Set up Google authentication request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '297394516837-fucngevtqas4j0iic02sp8hnnlcqap3s.apps.googleusercontent.com', // Replace with your actual Expo client ID
    iosClientId: 'YOUR_IOS_CLIENT_ID',   // Replace with your actual iOS client ID
    androidClientId: '297394516837-fucngevtqas4j0iic02sp8hnnlcqap3s.apps.googleusercontent.com', // Replace with your actual Android client ID
    webClientId: '297394516837-fucngevtqas4j0iic02sp8hnnlcqap3s.apps.googleusercontent.com',    // Replace with your actual web client ID
  });

  // Handle Google login response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google Authentication:', authentication);
      // Navigate to the home screen or handle authenticated user
      navigation.navigate('home');
    }
  }, [response]);

  const handleLoginPress = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('home');
    });
  };

  const handleGoogleLogin = async () => {
    console.log('Google Login Pressed');
    if (request) {
      await promptAsync();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <ImageBackground
          source={{ uri: 'https://your-image-url.com/background.jpg' }} // Add your background image URL
          style={styles.backgroundImage}
          resizeMode="cover"
          blurRadius={5}
        >
          <View style={styles.overlay} />
          <View style={styles.logoContainer}>
            <MaterialIcons name="lock" size={100} color="#fff" style={styles.logoShadow} />
            <Text style={styles.logoText}>Welcome Back</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#fff"
            />
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#fff"
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.loginButtonStyle} onPress={handleLoginPress}>
            <Text style={styles.loginTextStyle}>Login</Text>
          </TouchableOpacity>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.successMessageStyle}>Login Successful!</Text>
          </Animated.View>
          <View style={styles.dividerStyle} />
          <Text style={styles.socialLoginContainer}>Or login with:</Text>
          <TouchableOpacity style={styles.socialButtonStyle} onPress={handleGoogleLogin}>
            <MaterialIcons name="google" size={24} color="#4267B2" />
            <Text style={styles.googleTextStyle}>Google</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  logoShadow: {
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    height: 50,
    width: '100%',
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    elevation: 3,
  },
  passwordInputContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    height: 50,
    width: '100%',
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    elevation: 3,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 20,
    top: 12,
  },
  loginButtonStyle: {
    height: 50,
    width: '90%',
    backgroundColor: '#FF7A59',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  loginTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successMessageStyle: {
    marginTop: 16,
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerStyle: {
    height: 1,
    marginTop: 24,
    marginBottom: 12,
    width: '80%',
    backgroundColor: '#fff',
  },
  socialLoginContainer: {
    marginTop: 16,
    color: '#fff',
    fontSize: 16,
  },
  socialButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    padding: 10,
    marginTop: 16,
    width: '80%',
    justifyContent: 'center',
    elevation: 2,
  },
  googleTextStyle: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4267B2',
  },
});

export default LoginScreen;
