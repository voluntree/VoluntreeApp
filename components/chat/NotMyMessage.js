import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { theme } from "../../tailwind.config";
var width = Dimensions.get("window").width; //full width

const NotMyMessage = (props) => {
  const { message } = props;
  const hour = String(new Date(message.date).getHours()).padStart(2, '0') + ":" + String(new Date(message.date).getMinutes()).padStart(2, '0')
  return (
    <View className="flex mx-4 p-2 my-1 h-auto w-60 bg-costas rounded-lg">
      <Text className="font-semibold text-base text-ambiental">
        {message.user.nombre} {message.user.apellidos}
      </Text>
      <View className="flex-row flex-wrap rounded-lg justify-between">
      <Text className="flex-col flex-wrap text-base text-ambiental">{message.message}</Text>
      <View className = "items-end grow justify-end">
          <Text className = "text-ambiental">{hour}</Text>
        </View>
      </View>
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
