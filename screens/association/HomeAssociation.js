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
        <SafeAreaView>
            <View className = "p-4">
                <Text className = "font-bold text-2xl">
                    Mis Actividades
                </Text>
            </View>
            <ListaActividadesAsociacion/>
        </SafeAreaView>
    )
}

export default HomeAssociation;