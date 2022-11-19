import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardEvent,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput, Checkbox, Modal } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app, auth, db } from "../../utils/firebase";
import Spinner from "react-native-loading-spinner-overlay";

import {
  doc,
  getDocs,
  collection,
  where,
  query,
  getDoc,
} from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    setEmail(""), setPassword("");
    setSpinner(false);
  }, []);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [tipoUser, setTipoUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusAsoc, setStatusAsoc] = useState("unchecked");
  const [statusVoluntario, setStatusVoluntario] = useState("unchecked");

  function actualizarEmail(value) {
    setEmail(value.trim());
  }
  function actualizarContraseña(value) {
    setPassword(value);
  }

  const [usuario, setUsuario] = useState();
  const [spinner, setSpinner] = useState(false);

  const Stack = createNativeStackNavigator();

  const navigation = useNavigation();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSpinner(true);
        const user = userCredential.user;
        const q = query(
          collection(db, "voluntarios"),
          where("correo", "==", email)
        );
        const data = getDocs(q).then((querySnapshot) => {
          console.log(querySnapshot);
          if (!querySnapshot.empty) {
            setSpinner(false);
            navigation.navigate("UserHome");
          } else {
            navigation.navigate("AssociationHome");
          }
        });
      })
      .catch((error) => {
        setSpinner(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/invalid-email":
            Alert.alert("Advertencia", "Correo inválido");
            break;

          case "auth/wrong-password":
            Alert.alert("Advertencia", "Contraseña Incorrecta");
            break;

          case "auth/user-not-found":
            Alert.alert("Advertencia","Correo electrónico no registrado")

          default:
            // Alert.alert(errorCode);
            Alert.alert("Advertencia", "Error al iniciar sesión");
        }
      });
  };

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
              autoCapitalize="none"
              onChangeText={(value) => actualizarEmail(value)}
              value={email}
              left={<TextInput.Icon name="account" />}
              underlineColor="blue"
              label="Email"
              className=""
              placeholder={""}
              mode="flat"
            ></TextInput>
          </View>
          <View className="mx-8">
            <TextInput
              autoCapitalize="none"
              secureTextEntry={secureTextEntry}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}
                />
              }
              onChangeText={(text) => actualizarContraseña(text)}
              value={password}
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
      <View>
        <TouchableOpacity
          className="mx-8"
          onPress={() => navigation.navigate("Registro")}
        >
          <View className="bg-[#80a8ff] w-full rounded-full h-12 items-center justify-center">
            <Text className="font-semibold text-base tracking-wide text-[#fff]">
              Registrarse
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {spinner ? (
        <View className="h-full w-full absolute items-center justify-center bg-[#27272a] opacity-70">
          <ActivityIndicator
            className=""
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            color="#0000ff"
            size="large"
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Login;
