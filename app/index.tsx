import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();
  //AsyncStorage.clear();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/signupPage');
    }, 1000); // Delayed navigation to ensure Root Layout is mounted

    return () => clearTimeout(timeout); // Clean up timeout on component unmount
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Show a loading indicator while waiting */}
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
