import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/login/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import FixedHeader from "./FixedHeader";
import { TabNavigator } from "./TabNavigator";

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Screen name='Login' component={LoginScreen}></Screen>
        <Screen name='UserHome' component={TabNavigator}></Screen>
    </Navigator>   
)

export default AppNavigator;