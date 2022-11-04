import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import React, { useLayoutEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";
import * as Progress from "react-native-progress";
import { Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";
import { TabView } from "react-native-tab-view";
import ProfileTabScreenStack from "../ProfileTabScreenStack";
import NewsTabScreenStack from "../NewsTabScreenStack";
import UserProfileTab from "../../components/UserProfileTab";

const ProfileScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  
  return (
    <TailwindProvider>
      <SafeAreaView className="h-full w-full items-center">
        {/* Contenedor principal*/}
        <View className="flex-row w-full max-w-full bg-blanco p-2 space-x-2 items-center">
          {/* Avatar*/}
          <View className="w-20 h-20 rounded-full bg-bottomTabs" />
          {/* Contenedor Info Usuario*/}
          <View className="flex flex-grow space-y-2">
            {/* Contenedor Nombre, Nivel, Experiencia*/}
            <View className="flex-row justify-between">
              {/* Nombre */}
              <View className="justify-center max-w-[120px]">
                <Text className="text-base">Catalin</Text>
              </View>
              {/* Nivel */}
              <View className="flex justify-center items-center">
                <Text>Nivel</Text>
                <View className="bg-bottomTabs w-[30px] h-[30px] justify-center items-center rounded-full">
                  <Text>99</Text>
                </View>
              </View>
              {/* Experiencia */}
              <View className="flex w-28 justify-center items-center">
                <Text>Experiencia</Text>
                <Text className="text-right w-full text-xs">
                  5000/10000 XP
                </Text>
                <Progress.Bar
                  className="w-full"
                  progress={0.5}
                  width={null}
                  style={{
                    backgroundColor: theme.colors.bottomTabs,
                    borderWidth: 0,
                    height: 10,
                  }}
                  color={theme.colors.focusBottomTabs}
                  height={10}
                />
              </View>
            </View>
            {/* Contenedor Editar Perfil y Siguiendo */}
            <View className="flex-row space-x-2">
              {/* Botón Editar Perfil*/}
              <View className="flex-grow bg-bottomTabs h-8 rounded-lg justify-center items-center">
                <Text>Editar Perfil</Text>
              </View>
              {/*Botón Siguiendo*/}
              <View className="flex-grow bg-bottomTabs h-8 rounded-lg justify-center items-center">
                <Text>Siguiendo</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex w-full max-w-full bg-blanco p-2">
          <Text className="font-bold">Catalin Marian</Text>
          <Text className="">
            Descripción adasdmasldmasld lad malsd mals mdalsdmasldmasldm
            alsmdlasm dlasmd lasmd lamsdlams dlmasldmasldmasl msal dmasld
            masldmasl mda lsmdasl mdaslmd salm
          </Text>
        </View>
        <View className = "w-full h-[75%]">
          <UserProfileTab />
        </View>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default ProfileScreen;
