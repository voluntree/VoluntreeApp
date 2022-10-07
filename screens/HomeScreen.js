import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { TailwindProvider } from "tailwindcss-react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useState } from "react";
import TarjetaDeActividad from "../components/TarjetaDeActividad";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <TailwindProvider>
      <SafeAreaView className="bg-white h-full items-center pt-5">
        <ScrollView>
          <View><TarjetaDeActividad /></View>
          
        </ScrollView>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default HomeScreen;
