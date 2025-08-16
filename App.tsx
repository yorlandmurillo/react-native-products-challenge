import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

const Stack = createStackNavigator<any>();

function App() {
  const askPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
          PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
        ]);

        const writeGranted =
          granted[PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR] ===
          PermissionsAndroid.RESULTS.GRANTED;

        const readGranted =
          granted[PermissionsAndroid.PERMISSIONS.READ_CALENDAR] ===
          PermissionsAndroid.RESULTS.GRANTED;

        return writeGranted && readGranted;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
  };
  useEffect(() => {
    askPermission();
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            options={{ title: '', headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            options={{ title: 'Product Detail' }}
            component={ProductDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
