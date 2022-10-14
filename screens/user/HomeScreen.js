import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import React, { useLayoutEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { TailwindProvider } from "tailwindcss-react-native";
import ListaDeTarjetas from "../../components/ListaDeTarjetas";
import ListaFiltros from "../../components/ListaFiltros";
import Buscador from "../../components/Buscador";
import ActivityScreen from "./ActivityScreen";
import FixedHeader from "../../components/FixedHeader";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <TailwindProvider>
      <FixedHeader/>
      <SafeAreaView className="h-full items-center">
          <Buscador/>
          <ListaFiltros/>
          <ListaDeTarjetas/>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default HomeScreen;
