import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width

const MyMessage = (props) => {
  const { message } = props;
  return (
    <View style={st.msg}>
      <View className="mx-4 p-2 my-1 h-auto w-52 bg-educacion rounded-lg">
      
      <Text className="flex-col flex-wrap text-base">{message.message}</Text>
    </View>
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
