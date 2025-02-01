import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import NoteScreen from './screens/noteScreen';
import AboutScreen from './screens/AboutScreen'; // Import AboutScreen
import ContactScreen from './screens/ContactScreen'; // Import ContactScreen

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
        
        {/* Note Screen */}
        <Stack.Screen
          name="Note"
          component={NoteScreen}
          options={{ headerShown: false }}
        />
        
        {/* About Screen */}
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: "About Us", // Optional: Customize the header title
            headerStyle: { backgroundColor: '#4A90E2' },
            headerTintColor: '#fff',
          }}
        />
        
        {/* Contact Screen */}
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{
            title: "Contact Us", // Optional: Customize the header title
            headerStyle: { backgroundColor: '#4A90E2' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
