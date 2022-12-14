import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { Modal, TextInput } from "react-native-paper";
import { ActivityIndicator } from "react-native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app, auth, db } from "../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import Svg, { Path } from "react-native-svg";
import { theme } from "../../tailwind.config";

const UserRegister = () => {
  useEffect(() => {
    setSpinner(false);
  }, []);

  const [spinner, setSpinner] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  const [dni, setDni] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [contraseña2, setContraseña2] = useState("");

  const navigation = useNavigation();

  function validarDni() {
    var numero;
    var letra;
    var letr;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;
    dni.toUpperCase();
    if (dni === "") {
      alert("Introduzca el DNI");
      return false;
    }
    if (expresion_regular_dni.test(dni) == true) {
      numero = dni.substr(0, dni.length - 1);
      letr = dni.substr(dni.length - 1, 1);
      numero = numero % 23;
      letra = "TRWAGMYFPDXBNJZSQVHLCKET";
      letra = letra.substring(numero, numero + 1);
      if (letra != letr.toUpperCase()) {
        alert("Dni erroneo, la letra del NIF no se corresponde");
        return false;
      } else return true;
    } else {
      alert("Dni erroneo, formato no válido");
      return false;
    }
  }
  function dataOk() {
    let ok = true;
    validarDni();
    if (!validarDni()) {
      ok = false;
    }
    if (contraseña !== contraseña2) {
      alert("Las contraseñas no coinciden");
      ok = false;
    }
    if (telefono.length() < 9) {
      alert("El telefono no es correcto");
      return false;
    }
    return ok;
  }

  function handleSubmit() {
    if (dataOk) {
      registerUser(nombre, apellidos, dni, email, contraseña, telefono);
    }
  }

  function registerUser(nombre, apellidos, dni, email, contraseña, telefono) {
    createUserWithEmailAndPassword(auth, email, contraseña)
      .then((userCredential) => {
        setSpinner(true);
        const user = userCredential.user;
        setDoc(doc(db, "voluntarios", user.uid), {
          nombre: nombre,
          correo: email,
          dni: dni,
          apellidos: apellidos,
          fotoPerfil: "default.png",
          telefono: telefono,
          actividades: [],
          fechaDeNacimiento: "",
          descripcion: "",
          puntos: 0,
          nuevo: true,
          siguiendo: [],
          nuevo: true,
        }).then(() => {
          Alert.alert("¡Registrado con exito!");
          setSpinner(false);
          navigation.navigate("Login");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/invalid-email":
            Alert.alert("Advertencia", "El correo no es válido");
            break;

          case "auth/email-already-exists":
            Alert.alert("Advertencia", "El email ya esta en uso");
            break;

          case "auth/weak-password":
            Alert.alert(
              "Advertencia",
              "La contraseña debe tener al menos 6 caracteres"
            );
            break;

          default:
            Alert.alert(errorCode);
        }
      });
  }
  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="position">
          <View className="px-6">
            <Text className=" font-bold text-2xl my-6">
              Registro de voluntario
            </Text>
            <View>
              <Text className="text-lg text-ambiental">Nombre:</Text>
              <TextInput
                textColor={theme.colors.ambiental}
                outlineStyle={{ borderWidth: 2 }}
                activeOutlineColor={theme.colors.comunitario}
                style={{ backgroundColor: "white" }}
                outlineColor={theme.colors.comunitario}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={(text) => setNombre(text.trim())}
              />
            </View>
            <View>
              <Text className="text-lg text-ambiental">Apellidos:</Text>
              <TextInput
                textColor={theme.colors.ambiental}
                outlineStyle={{ borderWidth: 2 }}
                activeOutlineColor={theme.colors.comunitario}
                style={{ backgroundColor: "white" }}
                outlineColor={theme.colors.comunitario}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={(text) => {
                  setApellidos(text);
                }}
              />
            </View>
            <View>
              <Text className="text-lg text-ambiental">DNI:</Text>
              <TextInput
                textColor={theme.colors.ambiental}
                outlineStyle={{ borderWidth: 2 }}
                activeOutlineColor={theme.colors.comunitario}
                style={{ backgroundColor: "white" }}
                outlineColor={theme.colors.comunitario}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={(text) => {
                  setDni(text.trim());
                }}
              />
            </View>
            <View>
              <Text className="text-lg text-ambiental">
                Correo electrónico:
              </Text>
              <TextInput
                textColor={theme.colors.ambiental}
                outlineStyle={{ borderWidth: 2 }}
                activeOutlineColor={theme.colors.comunitario}
                style={{ backgroundColor: "white" }}
                outlineColor={theme.colors.comunitario}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={(text) => {
                  setEmail(text.trim());
                }}
              />
            </View>
            <View>
              <Text className="text-lg text-ambiental">Contraseña:</Text>
              <TextInput
                textColor={theme.colors.ambiental}
                outlineStyle={{ borderWidth: 2 }}
                activeOutlineColor={theme.colors.comunitario}
                style={{ backgroundColor: "white" }}
                outlineColor={theme.colors.comunitario}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={(text) => {
                  setContraseña(text.trim());
                }}
                secureTextEntry={secureTextEntry}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => {
                      setSecureTextEntry(!secureTextEntry);
                    }}
                  />
                }
              />
            </View>
            <View>
              <Text className="text-lg text-ambiental">
                Repetir contraseña:
              </Text>
              <TextInput
                textColor={theme.colors.ambiental}
                outlineStyle={{ borderWidth: 2 }}
                activeOutlineColor={theme.colors.comunitario}
                style={{ backgroundColor: "white" }}
                outlineColor={theme.colors.comunitario}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={(text) => {
                  setContraseña2(text.trim());
                }}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => {
                      setSecureTextEntry2(!secureTextEntry2);
                    }}
                  />
                }
                secureTextEntry={secureTextEntry2}
              />
            </View>
            <View>
              <Text className="text-lg text-ambiental">Telefono:</Text>
              <TextInput
                textColor={theme.colors.ambiental}
                outlineStyle={{ borderWidth: 2 }}
                activeOutlineColor={theme.colors.comunitario}
                style={{ backgroundColor: "white" }}
                outlineColor={theme.colors.comunitario}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={(text) => {
                  setTelefono(text.trim());
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <Text className="ml-6 mt-4">Todos los campos* son obligatorios</Text>
        <View className="pb-24"></View>
        <TouchableOpacity
          className=" absolute bottom-0 right-0"
          onPress={handleSubmit}
        >
          <View className="m-8">
            <Svg
              width="48"
              height="24"
              viewBox="0 0 26 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.2929L19.3431 0.928934C18.9526 0.538409 18.3195 0.538409 17.9289 0.928934C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM-8.74228e-08 9L25 9L25 7L8.74228e-08 7L-8.74228e-08 9Z"
                fill="#086841"
              />
            </Svg>
          </View>
        </TouchableOpacity>
      </ScrollView>
      {spinner ? (
        <View
          className="h-full w-full items-center justify-center absolute bg-[#27272a] opacity-70"
          pointerEvents="none"
        >
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
            size={48}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default UserRegister;
