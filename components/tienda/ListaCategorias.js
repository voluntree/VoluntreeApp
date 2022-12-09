import { View, Text } from "react-native";
import React from "react";

const ListaCategorias = (props) => {

  return (
    <View className="flex-row space-x-4">
      {props.categorias.map((item, index) => {
        <Text key={index}>{item}</Text>;
      })}
    </View> 
  );
}

export default ListaCategorias;
