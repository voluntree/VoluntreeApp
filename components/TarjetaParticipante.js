import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const TarjetaParticipante = (props) => {
  return (
    <View className="h-16 w-fit bg-blanco my-2 mx-3 rounded-md">
      <TouchableOpacity className="flex-row justify-center items-center h-full">
        <View className="w-1/5 p-2 flex items-center">
          <View className="border-solid rounded-full bg-bottomTabs w-12 h-12 "></View>
          <View className="border-solid border-2 rounded-full flex bg-blanco w-6 h-6 absolute right-1 bottom-1 items-center justify-start">
            <Text>0</Text>
          </View>
        </View>
        <View className="w-3/5 flex-row flex-wrap">
          <Text className="font-bold text-lg">{props.item.nombre} </Text>
          <Text className="font-bold text-lg">{props.item.apellidos}</Text>
        </View>
        <View className="flex bg-bottomTabs w-1/5 h-full items-center justify-center rounded-r-md">
          <Icon name="check-circle-fill" type="octicon" color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TarjetaParticipante;
