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
import TarjetaDeActividad from "../../components/TarjetaDeActividad";
import ListaDeTarjetas from "../../components/ListaDeTarjetas";
import ListaFiltros from "../../components/ListaFiltros";
import Buscador from "../../components/Buscador";
import ActivityScreen from "./ActivityScreen";

const HomeScreen = () => {
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
        <ListaDeTarjetas valor={SearchText} />
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default HomeScreen;
