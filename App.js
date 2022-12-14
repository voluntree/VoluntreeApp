import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FixedHeader from "./components/user/FixedHeader";
import AppNavigator from "./components/AppNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store = {store}>
        <TailwindProvider>
          <AppNavigator />
        </TailwindProvider>
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );


}

const safeArea = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    }})
