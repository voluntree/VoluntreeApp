import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";


const TarjetaParticipante = (props) => {
  
  return (
    <TouchableOpacity>
      <View className = " flex-row justify-between bg-blanco h-[75px] mx-3 mt-3 rounded-[10px] ">
        <View className = "flex-row items-center ml-[10px] w-[280px] overflow-hidden text-ellipsis">
          <View className = "h-[50px] w-[50px] rounded-full bg-bottomTabs"></View>
          <View className = "absolute bg-blanco h-[25px] w-[25px] rounded-full items-center justify-center top-[37px] left-[35px] border-[2px]" >
              <Text className = "font-bold">0</Text>
          </View>
            <Text className = "ml-[10px] text-xl font-bold ">{props.item.nombre} {props.item.apellidos}</Text>
          </View>
          <View className = "bg-bottomTabs rounded-r-[10px] h-full w-[75px] justify-center">
            <Icon name="check-circle-fill" type="octicon" color="#fff" />
          </View>
      </View>
    </TouchableOpacity>
  );
};

export default TarjetaParticipante;
