import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import React, { useLayoutEffect, useState} from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { TailwindProvider } from "tailwindcss-react-native";
import ListaMisActividades from "../components/ListaMisActividades";
import ListaFiltros from "../components/ListaFiltros";
import Buscador from "../components/Buscador";

const MyActivitiesScreen = () => {
  const navigation = useNavigation();

  const [SearchText, setSearchText] = useState("");

    const handleSearchTextChange = (text) => {
      setSearchText(text);
    };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  

  return (
    <TailwindProvider>
      <SafeAreaView className="h-full items-center">
        <ListaFiltros />
        <Buscador
          onSearchTextChange={handleSearchTextChange}
          valor={SearchText}
        />
        <Text className="w-full px-[8px] text-xl font-bold ">Mis Actividades</Text>
        <ListaMisActividades valor = {SearchText} />
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default MyActivitiesScreen;
