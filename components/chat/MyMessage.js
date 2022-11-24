import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width

const MyMessage = (props) => {
  const { message } = props;
  return (
    <View style={st.msg}>
      <View className="flex-col flex-wrap mx-4 p-2 my-2 h-auto w-52 bg-bottomTabs rounded-md">
      <Text>
        {message.user.nombre} {message.user.apellidos}
      </Text>
      <Text>{message.message}</Text>
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
