import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/login/Login";
import {TabNavigator} from "./user/TabNavigator";
import AssociationTab from "./association/AssociationTab";
import AssociationActivityDetails from "../screens/association/AssociationActivityDetails";
import ParticipantsList from "../screens/association/ParticipantsList";
import QRScanner from './../screens/user/QRScanner';
import QRGenerator from './../screens/association/QRGenerator';
import Registro from "../screens/register/Registro";
import EditActivity from "../screens/association/EditActivity";
import Tienda from "./tienda/Tienda";
import ActivityChat from '../screens/chat/ActivityChat';
import CreateNewArticle from "../screens/association/CreateNewArticle";
import EditProfileAssoc from "../screens/association/EditProfileAssoc";
import ActivityScreen from './../screens/user/ActivityScreen';
import NewsScreen from './../screens/user/NewsScreen';
import OnBoarding from "../screens/about/OnBoarding";
import ModifyArticle from "../screens/association/ModifyArticle";
import HistorialActividades from "../screens/user/HistorialActividades";
import AssocFromUser from "../screens/user/AssocFromUser";
import EditProfile from "../screens/user/EditProfile";
import FollowingScreen from "../screens/user/FollowingScreen";
import Donation from "../screens/user/Donation";

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Screen name='Login' component ={Login}/>
        <Screen name='Registro' component={Registro}/>

        <Screen name='UserHome' component={TabNavigator}/>
        <Screen name="Activity" component={ActivityScreen}/>
        <Screen name="Donacion" component={Donation}/>
        <Screen name='AssocFromVol' component={AssocFromUser}/>
        <Screen name='QRscanner' component={QRScanner}/>
        <Screen name='Following' component={FollowingScreen}/>
        <Screen name='EditProfileVol' component={EditProfile}/>
        <Screen name='Tienda' component = {Tienda}/>
        <Screen name='HistorialActividades' component = {HistorialActividades}/>

        <Screen name='AssociationHome' component={AssociationTab}/>
        <Screen name='AssociationActivityDetails' component={AssociationActivityDetails}/>
        <Screen name='Edit' component={EditActivity}/>
        <Screen name='ParticipantsList' component={ParticipantsList}/>
        <Screen name='NuevoArticulo' component={CreateNewArticle}/>
        <Screen name='Articulo' component={NewsScreen}/>
        <Screen name='Modify Article' component={ModifyArticle}/>
        <Screen name='QRgenerator' component={QRGenerator}/>
        <Screen name='EditProfileAssoc' component={EditProfileAssoc}/>

        <Screen name='Chat Actividad' component={ActivityChat}/>

        <Screen name='OnBoarding' component={OnBoarding}/>
    </Navigator>   
)

export default AppNavigator;