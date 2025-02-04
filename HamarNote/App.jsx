import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import NoteScreen from './screens/noteScreen';
import AboutScreen from './screens/AboutScreen'; // Import AboutScreen
import ContactScreen from './screens/ContactScreen'; // Import ContactScreen
import SignInScreen from './screens/SignInScreen'; // Import SignInScreen
import SignUpScreen from './screens/SignUpScreen'; // Import SignUpScreen
import SettingsScreen from './screens/SettingScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Note"
          component={NoteScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: "About Us", // Optional: Customize the header title
            headerStyle: { backgroundColor: '#7360DF' },
            headerTintColor: '#fff',
          }}
        />
        
        {/* Contact Screen */}
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{
            title: "Contact Us", // Optional: Customize the header title
            headerStyle: { backgroundColor: '#7360DF' },
            headerTintColor: '#fff',
          }}
        />

        {/* Sign In Screen */}
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            title: "Sign In",
            headerStyle: { backgroundColor: '#7360DF' },
            headerTintColor: '#fff',
          }}
        />

        {/* Sign Up Screen */}
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: "Sign Up",
            headerStyle: { backgroundColor: '#7360DF' },
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen
          name="NoteScreen"
          component={NoteScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
