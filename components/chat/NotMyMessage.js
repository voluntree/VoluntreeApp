import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
var width = Dimensions.get('window').width; //full width

const NotMyMessage = (props) => {
  const { message } = props;
  return (
    <View className="flex-col flex-wrap mx-4 p-2 my-1 h-auto w-52 bg-[#d1d1d1] rouded-md left-2">
      <Text>
        {message.user.nombre} {message.user.apellidos}
      </Text>
      <Text className="flex-col flex-wrap">{message.mensaje}</Text>
    </View>
  );
};

const st = StyleSheet.create({
  msg:{
    width: width,
    flex: 1,
    alignItems: "flex-start"
  }
})

export default NotMyMessage;