import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { StyleSheet } from "react-native";

const AssociationRegister = () => {
  const style = StyleSheet.create({
    textinput: {
      height: 40,
      margin: 2,
      borderWidth: 1,
      padding: 10,
      borderRadius: 15,
    },
  });
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
      >
        {(props) => (
          <ScrollView className="px-6 space-y-4">
            <Text className=" font-bold text-2xl">Registro asociación</Text>
            <Text className=" font-semibold text-lg">
              Datos del representante:
            </Text>
            <View className="mx-1 space-y-2">
              <View className="">
                <Text>Nombre:</Text>
                <TextInput style={style.textinput} />
              </View>
              <View className="">
                <Text>Apellidos:</Text>
                <TextInput style={style.textinput} />
              </View>
              <View className="">
                <Text>DNI:</Text>
                <TextInput style={style.textinput} />
              </View>
            </View>
            <Text className=" font-semibold text-lg">
              Datos de la asociación:
            </Text>
            <View className="mx-1 space-y-2">
              <View className="">
                <Text>Nombre:</Text>
                <TextInput style={style.textinput} />
              </View>
              <View className="">
                <Text>NIF:</Text>
                <TextInput style={style.textinput} />
              </View>
              <View className="">
                <Text>Email:</Text>
                <TextInput style={style.textinput} />
              </View>
              <View className="">
                <Text>Contraseña:</Text>
                <TextInput style={style.textinput} />
              </View>
              <View className="">
                <Text>Repetir contraseña:</Text>
                <TextInput style={style.textinput} />
              </View>
              <View className="">
                <Text>Teléfono:</Text>
                <TextInput style={style.textinput} />
              </View>
            </View>
            
              <TouchableOpacity className="mx-12 my-5">
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
