import React, {useLayoutEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AssociationTab from "../../components/association/AssociationTab";
import ListaActividadesAsociacion from "../../components/ListaActividadesAsociacion";
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
            <ListaActividadesAsociacion/>
        </SafeAreaView>
    )
}

export default HomeAssociation;