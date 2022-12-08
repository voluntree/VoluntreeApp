import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { theme } from "../../tailwind.config";

var width = Dimensions.get('window').width; //full width


const MyMessage = (props) => {
  const { message } = props;
  const hour = String(new Date(message.date).getHours()).padStart(2, '0') + ":" + String(new Date(message.date).getMinutes()).padStart(2, '0')

  return (
    <View style={st.msg}>
      <View className="mx-4 flex-row flex-wrap p-2 my-1 h-auto w-52 bg-educacion rounded-lg justify-between">
        <Text className="flex-col flex-wrap text-base text-ambiental">{message.message}</Text>
        <View className = "items-end grow justify-end">
          <Text className = "text-ambiental">{hour}</Text>
        </View>
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
