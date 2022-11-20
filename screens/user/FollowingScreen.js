import React, {useLayoutEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import ListaFollowing from "../../components/ListaFollowing";

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
        <SafeAreaView className = "flex w-full h-full justify-center items-center my-2">
            <Text className = " text-xl font-bold mb-1">Siguiendo</Text>
            <ListaFollowing usuario = {voluntario}/>
        </SafeAreaView>
    )
}

export default FollowingScreen;