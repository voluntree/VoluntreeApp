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
import { getUserInstance } from "../../service/LoginService";

const NewsAssociation = () => {
    const navigation = useNavigation();
    const q = query(collection(db,"articulos"),where("asociacion","==",getUserInstance().nombre))
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className="bg-blanco w-full h-full">
            <View className="w-full py-4 bg-blanco items-center">
                <Text className="text-ambiental font-bold text-xl">
                    Mis Articulos
                </Text>
                <ListaArticulos mode="asociacion" query={q}/>
            </View>
        </SafeAreaView>
    )
}

export default NewsAssociation