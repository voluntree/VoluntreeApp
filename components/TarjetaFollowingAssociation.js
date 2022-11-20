import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { useEffect } from "react";
import { theme } from "../tailwind.config";
import { unfollowAsociation } from "../service/service";

const TarjetaFollowingAssociation = (props) => {
  return (
        <View className = "bg-blanco flex-row justify-between items-center p-2 rounded-md">
          <View className = "flex-row items-center space-x-2">
            <View className="border-solid rounded-full bg-bottomTabs w-12 h-12"></View>
            <Text className="font-bold text-lg">{props.asociacion.nombre}</Text>
            </View>   
          <TouchableOpacity onPress={() => {unfollowAsociation(props.usuario, props.asociacion.nombre)}}>
            <View className = "bg-bottomTabs p-2 px-4 rounded-md">
              <Text className = "text-[#fff]">Siguiendo</Text>
            </View>
          </TouchableOpacity>
        </View>
  );
};

export default TarjetaFollowingAssociation;
