import React, {useLayoutEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListaArticulos from "../../components/articulos/ListaArticulos";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from "react";
import { collection, query, where } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { useState } from "react";
import { getAssocByEmail } from "../../service/service";

const NewsAssociation = () => {
    const navigation = useNavigation();
      
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className = "bg-blanco w-full h-full">
            <View className = "bg-blanco items-center">
                <Text className = "font-bold text-xl text-ambiental ">
                    Mis Articulos
                </Text>
                <ListaArticulos />
            </View>
        </SafeAreaView>
    )
}

export default NewsAssociation