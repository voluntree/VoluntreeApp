import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { TextInput } from "react-native-paper";

const AssociationRegister = () => {
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
          <ScrollView className="px-6 space-y-4">
            <Text className=" font-bold text-2xl">Registro asociación</Text>
            <Text className=" font-semibold text-lg">
              Datos del representante:
            </Text>
            <View className="mx-1 space-y-2">
              <View className="">
                <TextInput underlineColor="blue" label="Nombre*" mode="flat" />
              </View>
              <View className="">
                <TextInput
                  underlineColor="blue"
                  label="Apellidos*"
                  mode="flat"
                />
              </View>
              <View className="">
                <TextInput underlineColor="blue" label="DNI*" mode="flat" />
              </View>
            </View>
            <Text className=" font-semibold text-lg">
              Datos de la asociación:
            </Text>
            <View className="mx-1 space-y-2">
              <View className="">
                <TextInput underlineColor="blue" label="Nombre*" mode="flat" />
              </View>
              <View className="">
                <TextInput underlineColor="blue" label="NIF*" mode="flat" />
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
                />
              </View>
              <View className="">
                <TextInput underlineColor="blue" label="Teléfono" mode="flat" />
              </View>
            </View>
            <Text>Todos los campos* son obligatorios</Text>
            <TouchableOpacity className="mx-12 my-5" onPress={props.handleSubmit}>
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
