import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './components/TabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <TabNavigator/>
      </TailwindProvider>
    </NavigationContainer>
  );
}
