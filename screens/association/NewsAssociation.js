import React from "react";
import { View, Text } from "react-native";
import ListaArticulos from "../../components/articulos/ListaArticulos";
import CrearArticulo from './../../components/articulos/CrearArticulo';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewsAssociation = () => {
    return (
        <SafeAreaView>
            <CrearArticulo/>
        </SafeAreaView>
    )
}

export default NewsAssociation