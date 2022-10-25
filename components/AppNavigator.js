import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/login/LoginScreen";
import {TabNavigator} from "./TabNavigator";
import AssociationTab from "./association/AssociationTab";
import Detalles from "../components/association/Detalles";

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Screen name='Login' component={LoginScreen}></Screen>
        <Screen name='UserHome' component={TabNavigator}></Screen>
        <Screen name='AssociationHome' component={AssociationTab}></Screen>
        <Screen name='Details' component={Detalles}></Screen>
    </Navigator>   
)

export default AppNavigator;