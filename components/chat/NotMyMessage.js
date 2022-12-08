import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width

const NotMyMessage = (props) => {
  const { message } = props;
  return (
    <View className="flex mx-4 p-2 my-1 h-auto w-60 bg-costas rounded-lg">
      <Text className="font-semibold text-base text-ambiental">
        {message.user.nombre} {message.user.apellidos}
      </Text>
      <Text className="flex-col flex-wrap text-base">{message.message}</Text>
    </View>
  );
};

export default NotMyMessage;
