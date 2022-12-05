import React, {useLayoutEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListaArticulos from "../../components/articulos/ListaArticulos";
import { SafeAreaView } from 'react-native-safe-area-context';

const NewsAssociation = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView>
            <View className = "p-4">
                <Text className = "font-bold text-2xl">
                    Mis Articulos
                </Text>
                <ListaArticulos/>
            </View>
        </SafeAreaView>
    )
}

export default NewsAssociation