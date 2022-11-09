import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { TextInput } from "react-native-paper";

const UserRegister = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  function dataOk(values){
    return true;
  }
  function registerUser(values){}
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
        onSubmit={(values)=>{if(dataOk()) registerUser(values)}}
      >
        {(props) => (
          <ScrollView className="mx-8 space-y-4">
            <Text className=" font-bold text-2xl">Registro</Text>
            <View className="">
              <TextInput underlineColor="blue" label="Nombre*" mode="flat" />
            </View>
            <View className="">
              <TextInput underlineColor="blue" label="Apellidos*" mode="flat" />
            </View>
            <View className="">
              <TextInput underlineColor="blue" label="DNI*" mode="flat" />
            </View>
            <View className="">
              <TextInput underlineColor="blue" label="Email*" mode="flat" />
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
              />
            </View>
            <View className="">
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
                underlineColor="blue"
                label="Repetir contraseña*"
                mode="flat"
              />
            </View>
            <View className="">
              <TextInput underlineColor="blue" label="Teléfono" mode="flat" />
            </View>
              <Text>Todos los campos* son obligatorios</Text>
            <TouchableOpacity className="mx-16 pt-2" onPress={props.handleSubmit}>
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

export default UserRegister;
