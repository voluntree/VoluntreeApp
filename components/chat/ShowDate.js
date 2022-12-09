import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { theme } from "../../tailwind.config";
var width = Dimensions.get("window").width; //full width

const ShowDate = (props) => {
  const { date } = props;
  
  return (
    <View className="p-2 my-1 rounded-lg items-center">
      <View className = "bg-deportivo px-4 py-2 rounded-md">
        <Text className = "text-ambiental font-bold">{date}</Text>
      </View>
    </View>
  );
};

export default ShowDate;
