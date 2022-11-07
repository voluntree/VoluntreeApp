import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardEvent,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app, auth } from "../../utils/firebase";

import { where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Login = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Stack = createNativeStackNavigator();

  const navigation = useNavigation();

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Usuario creado con Email")
      const user = userCredential.user;
      console.log(user);
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    });
  };

  const handleSignIn = () =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("signed in!")
      const user = userCredential.user;
      console.log(user)
      navigation.navigate("UserHome")
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <KeyboardAvoidingView behavior="position">
        <View className="">
          <Text className="tracking-wide text-base mt-5 pl-5">VOLUNTREE</Text>
          <Image
            className="w-full h-80"
            source={require("../../images/LoginImagen.jpg")}
          ></Image>
        </View>
        <View className="space-y-3 pb-6">
          <Text className="ml-8 font-bold text-2xl">LOGIN</Text>
          <View className="mx-8">
            <TextInput
              onChangeText={(text) => setEmail(text)}
              left={<TextInput.Icon name="account" />}
              underlineColor="blue"
              label="Nombre de usuario"
              className=""
              placeholder={""}
              mode="flat"
            ></TextInput>
          </View>
          <View className="mx-8">
            <TextInput
              secureTextEntry={secureTextEntry}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}
                />
              }
              onChangeText={(text) => setPassword(text)}
              left={<TextInput.Icon name="lock" />}
              underlineColor="blue"
              label="Contraseña"
              className=""
              placeholder={""}
              mode="flat"
            ></TextInput>
          </View>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity className="mx-8" onPress={handleSignIn}>
        <View className="bg-[#80a8ff] w-full rounded-full h-12 mb-4 items-center justify-center">
          <Text className="font-semibold text-base tracking-wide text-[#fff]">
            Entrar
          </Text>
        </View>
      </TouchableOpacity>
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

export default Login;
