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
        <SafeAreaView className = "bg-blanco">
            <View className = "py-4 items-center">
                <Text className = "text-ambiental font-bold text-xl">
                    Mis Actividades
                </Text>
            </View>
            <ListaActividadesAsociacion/>
        </SafeAreaView>
    )
}

export default HomeAssociation;