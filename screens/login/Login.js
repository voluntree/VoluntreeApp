import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
const Login = () => {
  return (
    <SafeAreaView className="bg-[#fff] h-full">
        <View className="">
          <Text className="tracking-wide text-base mt-5 pl-5">VOLUNTREE</Text>
          <Image
            className="w-full h-80"
            source={require("../../images/LoginImagen.jpg")}
          ></Image>
        </View>
        <View className="space-y-2 pt-6 mb-20">
          <Text className="ml-8 font-bold text-2xl">LOGIN</Text>
          <View className="mx-8">
            <Text className="">Nombre de usuario:</Text>
            <TextInput
              className=""
              placeholder={""}
              style={style.textinput}
            ></TextInput>
          </View>
          <View className="mx-8">
            <Text className="">Contraseña:</Text>
            <TextInput
              className=""
              placeholder={""}
              style={style.textinput}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity className="mx-16">
          <View className="bg-[#80a8ff] h-12 w-full rounded-2xl items-center justify-center">
            <Text className="font-semibold text-base tracking-wide text-[#fff]">
              Hazte voluntario!
            </Text>
          </View>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textinput: {
    height: 40,
    margin: 2,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});

export default Login;
