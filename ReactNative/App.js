import 'react-native-get-random-values'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import UserContextProvider from './store/userContext';
import CreateHunt from './components/CreateHunt';
import InviteFriendScreen from './screens/InviteFriendsScreen'
import ConfirmHuntScreen from './screens/ConfirmHuntScreen';
import LocationScreen from './screens/LocationScreen';
import CompleteHuntScreen from './screens/CompleteHuntScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <UserContextProvider >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="inviteFriend" component={InviteFriendScreen} options={{ headerShown: true, headerTitle: '',
              headerBackTitleVisible: false,
            }} />
            <Stack.Screen name="createHunt" component={CreateHunt} options={{ headerShown: true, headerTitle: '',
              headerBackTitleVisible: false }}/>
            <Stack.Screen name="location" component={LocationScreen} options={{ headerShown: true, headerTitle: '',
              headerBackTitleVisible: false, }}/> 
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{ headerShown: false}}/>  
            <Stack.Screen name='StartScreen' component={StartScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="ConfirmHunt" component={ConfirmHuntScreen} options={{ headerShown: true, headerTitle: '',
              headerBackTitleVisible: false, }} />
            <Stack.Screen name="CompleteHunt" component={CompleteHuntScreen} options={{ headerShown: true, headerTitle: '',
              headerBackTitleVisible: false,}}/>
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
