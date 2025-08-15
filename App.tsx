import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

const Stack = createStackNavigator<any>();

function App() {
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
