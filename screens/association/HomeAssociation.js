import React, {useLayoutEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AssociationTab from "../../components/association/AssociationTab";
import ListaActividadesAsociacion from "../../components/association/ListaActividadesAsociacion";
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeAssociation = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className = "bg-blanco w-full h-full">
            <View className="w-full py-4 bg-blanco items-center">
                <Text className = "text-ambiental font-bold text-xl">
                    Mis Actividades
                </Text>
                <ListaActividadesAsociacion/>
            </View>
        </SafeAreaView>
    )
}

export default HomeAssociation;