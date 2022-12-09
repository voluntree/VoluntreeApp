import React, {useLayoutEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from "react-native-elements";

import ListaFollowing from "../../components/ListaFollowing";
import { auth } from "../../utils/firebase";
import { theme } from "../../tailwind.config";

const FollowingScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {voluntario} = route.params;
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className = "flex w-full h-full justify-center items-center py-4 bg-blanco">
            <View className="flex flex-row w-full items-center justify-between">
                <TouchableOpacity className="w-10" onPress = {() => navigation.goBack()}>
                    <Icon name = "arrow-back" type = "material" color = {theme.colors.ambiental} size = {24}/>
                </TouchableOpacity>
                <Text className=" text-ambiental text-xl font-bold mb-1">Siguiendo</Text>
                <View className="w-10"/>
            </View>
            <ListaFollowing usuario = {auth.currentUser.uid}/>
        </SafeAreaView>
    )
}

export default FollowingScreen;