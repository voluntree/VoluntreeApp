import React, {useLayoutEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AssociationTab from "../../components/association/AssociationTab";
import ListaParticipantes from "../../components/ListaParticipantes";
import { useRoute } from "@react-navigation/native";

const ParticipantsList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { actividad, uri } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View className = "flex items-center my-[10px]">
            <Text className = " text-xl font-bold mb-[10px]">Lista Participantes</Text>
            <View className = " flex-row justify-between w-full px-[15px]">
                <Text className = " font-bold">Nº Participantes: {actividad.participantes.length}/{actividad.max_participantes}</Text>
                <Text className = " font-bold">Asistencia</Text>
            </View>
            <ListaParticipantes actividad= {actividad}/>
        </View>
    )
}

export default ParticipantsList;