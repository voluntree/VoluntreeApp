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
import { TailwindProvider } from "tailwindcss-react-native";
import ListaDeTarjetas from "../components/ListaDeTarjetas";
import ListaFiltros from "../components/ListaFiltros";
import Buscador from "../components/Buscador";

const MyActivitiesScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <TailwindProvider>
      {/* <FixedHeader/> */}
      <SafeAreaView className="h-full items-center">
          <Buscador/>
          <ListaFiltros/>
          <Text className="w-full px-[8px] text-xl font-bold ">Mis Actividades</Text>
          <ListaDeTarjetas/>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default MyActivitiesScreen;
