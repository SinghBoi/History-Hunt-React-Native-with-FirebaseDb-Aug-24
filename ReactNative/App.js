import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
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
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />  
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
