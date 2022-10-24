import React, {useLayoutEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ListaActividadesAsociacion from "../../components/ListaActividadesAsociacion";

const HomeAssociation = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View>
            <ListaActividadesAsociacion/>
        </View>
    )
}

export default HomeAssociation;