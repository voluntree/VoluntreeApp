import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FixedHeader from "./components/FixedHeader";
import { TabNavigator } from "./components/TabNavigator";
import AppNavigator from "./components/AppNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TailwindProvider>
          {/*<TabNavigator/> */}
          <AppNavigator />
        </TailwindProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );


}

const safeArea = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    }})
