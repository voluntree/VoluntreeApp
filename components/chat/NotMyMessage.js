import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { theme } from "../../tailwind.config";
var width = Dimensions.get("window").width; //full width

const NotMyMessage = (props) => {
  const { message } = props;
  return (
    <View className="flex mx-4 p-2 my-1 h-auto w-60 bg-costas rounded-lg">
      <Text className="font-semibold text-base text-ambiental">
        {message.user.nombre} {message.user.apellidos}
      </Text>
      <Text className="flex-col flex-wrap text-base">{message.message}</Text>
      <View style = {{position: "absolute",
                      top: 0,
                      left:-10,
                      width:0, 
                      height:0, 
                      borderTopWidth: 50,
                      borderTopColor: theme.colors.costas,
                      borderLeftWidth: 50,
                      borderLeftColor: "transparent",
                      zIndex: -1,
                      borderRadius: 5}}/>
    </View>
  );
};

export default NotMyMessage;
