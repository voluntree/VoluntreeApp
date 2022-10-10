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

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <TailwindProvider>
      <SafeAreaView className="bg-[#d8fde2] h-full items-center pt-5">
          <View>
            <ListaDeTarjetas/>
          </View>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default HomeScreen;
