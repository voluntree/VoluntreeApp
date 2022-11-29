import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width

const NotMyMessage = (props) => {
  const { message } = props;
  return (
    <View className="flex-0 mx-4 p-2 my-1 h-auto w-60 bg-[#f1f1f1] rounded-lg">
      <Text className="text-[#333] font-semibold text-base">
        {message.user.nombre} {message.user.apellidos}
      </Text>
      <Text className="flex-col flex-wrap text-base">{message.message}</Text>
    </View>
  );
};

export default NotMyMessage;
