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
import TarjetaDeActividad from "../components/TarjetaDeActividad";
import ListaDeTarjetas from "../components/ListaDeTarjetas";
import ListaFiltros from "../components/ListaFiltros";
import Buscador from "../components/Buscador";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <TailwindProvider>
      <SafeAreaView className="h-full items-center">
        <View className="mx-3 ">
          <Buscador/>
          <ListaFiltros className="z-10" />
          <ListaDeTarjetas className="z-20" />
        </View>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default HomeScreen;
