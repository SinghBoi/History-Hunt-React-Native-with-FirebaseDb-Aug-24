import 'react-native-get-random-values'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import UserContextProvider from './store/userContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <UserContextProvider >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />  
            <Stack.Screen name='StartScreen' component={StartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
