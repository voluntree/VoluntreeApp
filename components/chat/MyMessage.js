import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { theme } from "../../tailwind.config";

var width = Dimensions.get('window').width; //full width

const MyMessage = (props) => {
  const { message } = props;
  return (
    <View style={st.msg}>
      <View className="mx-4 p-2 my-1 h-auto w-52 bg-educacion rounded-lg">
        <Text className="flex-col flex-wrap text-base">{message.message}</Text>
      </View>
      <View style = {{position: "absolute",
                      top: 4,
                      right:6,
                      width:0, 
                      height:0, 
                      borderTopWidth: 25,
                      borderTopColor: theme.colors.educacion,
                      borderRightWidth: 25,
                      borderRightColor: "transparent",
                      zIndex: -1,
                      borderRadius: 5}}/>
    </View>
  );
};

const st = StyleSheet.create({
  msg:{
    width: width,
    flex: 1,
    alignItems: "flex-end"
  }
})

export default MyMessage;
