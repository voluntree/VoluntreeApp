import { View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import AssociationRegister from "./AssociationRegister";
import UserRegister from "./UserRegister";

const Registro = () => {
  let screenWidth = Dimensions.get("window").width;
  let screenHeight = Dimensions.get("window").height;
  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={true}
      scrollIndicatorInsets
    >
      <View
        style={{
          width: screenWidth,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserRegister />
      </View>
      <View
        style={{
          width: screenWidth,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AssociationRegister />
      </View>
    </ScrollView>
  );
};

export default Registro;
