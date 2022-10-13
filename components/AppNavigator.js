import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/login/LoginScreen";
import {TabNavigator} from "./TabNavigator";
import HomeAssociation from "../screens/association/HomeAssociation";
import { AssociationNavigator } from "./association/AssociationNavigator";

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Screen name='Login' component={LoginScreen}></Screen>
        <Screen name='UserHome' component={TabNavigator}></Screen>
        <Screen name='AssociationHome' component={AssociationNavigator}></Screen>
    </Navigator>   
)

export default AppNavigator;