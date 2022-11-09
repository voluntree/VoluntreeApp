import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { TextInput } from "react-native-paper";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app, auth, db } from "../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const AssociationRegister = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  const [dni, setDni] = useState("");
  const [nombreRepresentante, setNombreRepresentante] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [nombreAsoc, setNombreAsoc] = useState("");
  const [cif, setCif] = useState("");
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

  function validarCIF() {
    var par = 0;
    var non = 0;
    var letras = "ABCDEFGHKLMNPQS";
    var letra = cif.charAt(0);

    if (cif.length != 9) {
      alert('El Cif debe tener 9 dígitos');
      return false;
    }

    if (letras.indexOf(letra.toUpperCase()) == -1) {
      alert("El comienzo del Cif no es válido");
      return false;
    }

    for (let zz = 2; zz < 8; zz += 2) {
      par = par + parseInt(cif.charAt(zz));
    }

    for (let zz = 1; zz < 9; zz += 2) {
      let nn = 2 * parseInt(cif.charAt(zz));
      if (nn > 9) nn = 1 + (nn - 10);
      non = non + nn;
    }

    var parcial = par + non;
    var control = 10 - (parcial % 10);
    if (control == 10) control = 0;

    if (control != cif.charAt(8)) {
      alert("El Cif no es válido");
      return false;
    }
    //alert("El Cif es válido");
    return true;
  }

  function dataOk() {
    var ok = true;
    validarDni()
    if(!validarDni()){ok = false;}
    validarCIF()
    if(!validarCIF()){ok = false;}
    if(contraseña != contraseña2){alert("Las contraseñas no coinciden"); ok = false;}
    return ok;    
  }

  function registerUser(nombreRepresentante, apellidos, dni, nombreAsoc, cif, email, contraseña, telefono) {
    createUserWithEmailAndPassword(auth, email, contraseña)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "asociaciones", nombreAsoc), {
          CIF: cif,
          correo : email,
          fotoPerfil: "profileImages/asociaciones/default.jpg",
          nombre: nombreAsoc,
          num_seguidores : 0, 
          seguidores : [],
          telefono : telefono,
          tipoAsociacion: "",
          representante:{
            dni: dni,
            nombre: nombreRepresentante,
            apellidos: apellidos,
          }
        }).then(navigation.navigate('AssociationHome'));
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  }

  return (
    <SafeAreaView>
      <Formik
        initialValues={{
          nombre: "",
          apellidos: "",
          dni: "",
          email: "",
          password: "",
          phone: "",
        }}
        onSubmit={() => {
          if (dataOk())
            registerUser(
              nombreRepresentante,
              apellidos,
              dni,
              nombreAsoc,
              cif,
              email,
              contraseña,
              telefono
            )
        }}
      >
        {(props) => (
          <ScrollView className="px-6 space-y-4">
            <Text className=" font-bold text-2xl">Registro asociación</Text>
            <Text className=" font-semibold text-lg">
              Datos del representante:
            </Text>
            <View className="mx-1 space-y-2">
              <View className="">
                <TextInput
                  underlineColor="blue"
                  label="Nombre*"
                  mode="flat"
                  onChangeText={(text) => setNombreRepresentante(text)}
                />
              </View>
              <View className="">
                <TextInput
                  underlineColor="blue"
                  label="Apellidos*"
                  mode="flat"
                  onChangeText={(text) => setApellidos(text)}
                />
              </View>
              <View className="">
                <TextInput
                  autoComplete="off"
                  underlineColor="blue"
                  label="DNI*"
                  mode="flat"
                  onChangeText={(text) => setDni(text.trim())}
                />
              </View>
            </View>
            <Text className=" font-semibold text-lg">
              Datos de la asociación:
            </Text>
            <View className="mx-1 space-y-2">
              <View className="">
                <TextInput
                  underlineColor="blue"
                  label="Nombre*"
                  mode="flat"
                  onChangeText={(text) => setNombreAsoc(text)}
                />
              </View>
              <View className="">
                <TextInput
                  underlineColor="blue"
                  label="CIF*"
                  mode="flat"
                  onChangeText={(text) => setCif(text)}
                />
              </View>
              <View className="">
                <TextInput
                  underlineColor="blue"
                  label="Email*"
                  mode="flat"
                  onChangeText={(text) => setEmail(text.trim())}
                />
              </View>
              <View className="">
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
                  onChangeText={(text) => setContraseña(text)}
                />
              </View>
              <View className="">
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
                  label="Repetir contraseña*"
                  mode="flat"
                  onChangeText={(text) => setContraseña2(text)}
                />
              </View>
              <View className="">
                <TextInput
                  underlineColor="blue"
                  label="Teléfono"
                  mode="flat"
                  onChangeText={(text) => setTelefono(text.trim())}
                />
              </View>
            </View>
            <Text>Todos los campos* son obligatorios</Text>
            <TouchableOpacity
              className="mx-12 my-5"
              onPress={props.handleSubmit}
            >
              <View className="bg-[#80a8ff] h-12 w-full rounded-2xl items-center justify-center">
                <Text className="font-semibold text-base tracking-wide text-[#fff]">
                  Registrarse
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default AssociationRegister;
