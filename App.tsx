import React, { useEffect, useCallback } from 'react';
import { PermissionsAndroid, Platform, Linking } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home';
import { useNavigation } from '@react-navigation/native';
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

  const AppLinksChecker = () => {
    const navigation = useNavigation<any>();
    const handleDeepLink = useCallback(async ({ url }: any) => {
      try {
        if (url.search('/category/') > 0) {
          var valueId = url.split('category/');
          var catId = {
            id: valueId[1],
          };

          //little time to iniciate the app if it is closed
          setTimeout(() => {
            navigation.navigate('HomeScreen', catId);
          }, 500);
        } else if (url.search('/product/') > 0) {
          var valueId = url.split('product/');
          var prodId = {
            id: valueId[1],
          };

          setTimeout(() => {
            navigation.navigate('ProductDetailScreen', prodId);
          }, 500);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, []);

    useEffect(() => {
      Linking.addEventListener('url', handleDeepLink);
      Linking.getInitialURL().then((url: any) => {
        if (url) {
          handleDeepLink({ url });
        }
        return false;
      });
    }, [handleDeepLink]);

    return <></>;
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppLinksChecker />
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
