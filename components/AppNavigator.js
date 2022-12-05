import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/login/Login";
import LoginScreen from "../screens/login/LoginScreen";
import {TabNavigator} from "./user/TabNavigator";
import AssociationTab from "./association/AssociationTab";
import HomeAssociation from "../screens/association/HomeAssociation";
import AssociationActivityDetails from "../screens/association/AssociationActivityDetails";
import ParticipantsList from "../screens/association/ParticipantsList";
import ActivityScreen from './../screens/user/ActivityScreen';
import UserRegister from './../screens/register/UserRegister';
import AssociationRegister from './../screens/register/AssociationRegister';
import QRScanner from './../screens/user/QRScanner';
import QRGenerator from './../screens/association/QRGenerator';
import Registro from "../screens/register/Registro";
import EditActivity from "../screens/association/EditActivity";
import ActivityChat from '../screens/chat/ActivityChat';
import CreateNewArticle from "../screens/association/CreateNewArticle";

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="AssociationHome">
        <Screen name='Login' component ={Login}></Screen>
        <Screen name='LoginScreen' component={LoginScreen}></Screen>
        <Screen name='UserHome' component={TabNavigator}></Screen>
        <Screen name='AssociationHome' component={AssociationTab}></Screen>
        <Screen name='AssociationActivityDetails' component={AssociationActivityDetails}></Screen>
        <Screen name='ParticipantsList' component={ParticipantsList}></Screen>
        <Screen name='Actividad' component={ActivityScreen}/>
        <Screen name='Registro' component={Registro}/>
        <Screen name='QRscanner' component={QRScanner}/>
        <Screen name='QRgenerator' component={QRGenerator}/>
        <Screen name='Chat Actividad' component={ActivityChat}/>
        <Screen name='Edit' component={EditActivity}/>
        <Screen name='NuevoArticulo' component={CreateNewArticle}/>
    </Navigator>   
)

export default AppNavigator;