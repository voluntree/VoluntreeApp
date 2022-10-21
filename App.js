import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FixedHeader from "./components/FixedHeader";
import { TabNavigator } from "./components/TabNavigator";
import AppNavigator from "./components/AppNavigator";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <FixedHeader />
        {/*<TabNavigator/> */}
        <AppNavigator/>
      </TailwindProvider>
    </NavigationContainer>
  );
}
