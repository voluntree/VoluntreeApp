import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/login/LoginScreen";
import {TabNavigator} from "./TabNavigator";
import AssociationTab from "./association/AssociationTab";
import Detalles from "../components/association/Detalles";
import HomeAssociation from "../screens/association/HomeAssociation";
import AssociationActivityDetails from "../screens/association/AssociationActivityDetails";
import ParticipantsList from "../screens/association/ParticipantsList";

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Screen name='Login' component={LoginScreen}></Screen>
        <Screen name='UserHome' component={TabNavigator}></Screen>
        <Screen name='AssociationHome' component={AssociationTab}></Screen>
        <Screen name='Details' component={Detalles}></Screen>
        <Screen name='AssociationActivityDetails' component={AssociationActivityDetails}></Screen>
        <Screen name='ParticipantsList' component={ParticipantsList}></Screen>
    </Navigator>   
)

export default AppNavigator;