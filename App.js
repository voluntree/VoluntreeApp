import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import FixedHeader from "./components/FixedHeader";
import { TabNavigator } from "./components/TabNavigator";
import TarjetaDeActividad from "./components/TarjetaDeActividad";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <FixedHeader></FixedHeader>
      <NavigationContainer>
      <TailwindProvider>
        <TabNavigator/>
      </TailwindProvider>
    </NavigationContainer>
    </>
  );
}
