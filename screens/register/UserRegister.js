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
          nuevo:true,
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
    <SafeAreaView className=" h-full">
      <KeyboardAvoidingView behavior="position">
        <View className="px-6 space-y-2">
          <Text className=" font-bold text-2xl my-6">
            Registro de voluntario
          </Text>

          <TextInput
            underlineColor="blue"
            label="Nombre*"
            mode="flat"
            onChangeText={(text) => setNombre(text.trim())}
          />
          <TextInput
            underlineColor="blue"
            label="Apellidos*"
            mode="flat"
            onChangeText={(text) => {
              setApellidos(text);
            }}
          />
          <TextInput
            autoCapitalize="none"
            underlineColor="blue"
            label="DNI*"
            mode="flat"
            onChangeText={(text) => {
              setDni(text.trim());
            }}
          />
          <TextInput
            underlineColor="blue"
            label="Email*"
            mode="flat"
            onChangeText={(text) => {
              setEmail(text.trim());
            }}
            autoCapitalize="none"
          />
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
            underlineColor="blue"
            label="Contraseña*"
            mode="flat"
            autoCapitalize="none"
            onChangeText={(text) => {
              setContraseña(text.trim());
            }}
          />
          <TextInput
            secureTextEntry={secureTextEntry2}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => {
                  setSecureTextEntry2(!secureTextEntry2);
                }}
              />
            }
            autoCapitalize="none"
            underlineColor="blue"
            label="Repetir contraseña*"
            mode="flat"
            onChangeText={(text) => {
              setContraseña2(text.trim());
            }}
          />

          <TextInput
            underlineColor="blue"
            label="Teléfono"
            mode="flat"
            onChangeText={(text) => {
              setTelefono(text.trim());
            }}
            keyboardType="numeric"
          />
        </View>
      </KeyboardAvoidingView>
      <Text className="ml-6 mt-4">Todos los campos* son obligatorios</Text>
      <View className="mx-6 mt-4">
        <TouchableOpacity className="" onPress={handleSubmit}>
          <View className="bg-[#80a8ff] h-12 w-full rounded-2xl items-center justify-center">
            <Text className="font-semibold text-base tracking-wide text-[#fff]">
              Registrarse
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
