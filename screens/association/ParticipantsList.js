import React, {useLayoutEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AssociationTab from "../../components/association/AssociationTab";
import ListaParticipantes from "../../components/association/ListaParticipantes";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";

const ParticipantsList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { actividad, uri } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const goBack = () => {
        try {
          navigation.goBack();
        } catch (error) {}
      };
    
    return (
        <SafeAreaView className = "flex items-center space-y-2 w-full h-full">
            <View className = "flex-row w-full justify-start px-2"> 
                <Icon 
                    name="chevron-left"
                    type="octicons"
                    color={theme.colors.ambiental}
                    onPress = {goBack}
                    size={28}
                />
            </View>
            <View className = " flex-row justify-between w-full px-4">
                <Text className = "text-ambiental font-bold">Lista de voluntarios {actividad.participantes.length}/{actividad.max_participantes}</Text>
                <Text className = "text-ambiental font-bold">Asistencia</Text>
            </View>
            <View className = "h-fit w-full px-4 ">
                <View className = "h-0.5 w-full bg-ambiental"></View>
            </View>
            
            <ListaParticipantes actividad= {actividad}/>
        </SafeAreaView>
    )
}

export default ParticipantsList;