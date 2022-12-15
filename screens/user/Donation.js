import { View, Text, ScrollView, KeyboardAvoidingView, Image } from "react-native";
import React, { useState } from "react";

import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Donation = () => {
  const navigation = useNavigation();

  const [cantidad, setCantidad] = useState(0);
  const [metodo, setMetodo] = useState("VISA");
  const [numTarjeta, setNumTarjeta] = useState(0);
  const [mes, setMes] = useState(0);
  const [anyo, setAnyo] = useState(0);
  const [cvv, setCvv] = useState(0);

  function dataOk() {
    const date = new Date();
    const validarCantidad = cantidad > 0;
    const validarNum = numTarjeta >= 1000_0000_0000;
    const validarMes = mes - 1 >= 0 && mes - 1 < 12;
    const validarAnyo =
      date.getFullYear() > anyo ||
      (date.getFullYear() == anyo && date.getMonth() < mes - 1);
    const validarCVV = cvv >= 100;
    if (
      validarCantidad &&
      validarNum &&
      validarMes &&
      validarAnyo &&
      validarCVV
    )
      return true;
    else return false;
  }

  function formatCardNumber(num) {
    let number = num.replace(/[^0-9\.]+/g, "");
    const numb = parseInt(number);
    return numb;
  }

  function getError() {
    const date = new Date();
    const validarCantidad = cantidad > 0;
    const validarNum = numTarjeta >= 1000_0000_0000;
    const validarMes = mes - 1 >= 0 && mes - 1 < 12;
    const validarAnyo =
      date.getFullYear() > anyo ||
      (date.getFullYear() == anyo && date.getMonth() < mes - 1);
    const validarCVV = cvv >= 100;
    if (!validarCantidad) {
      throw Error("La cantidad a donar debe ser mayor a 0.");
    }
    if (!validarNum) {
      throw Error("El número de tarjeta es incorrecto.");
    }
    if (!validarMes) {
      throw Error("El mes debe ser un número de 1 a 12, ambos iclusive.");
    }
    if (!validarAnyo) {
      throw Error(
        "Asegurese de que el año es correcto o de que su tarjeta no haya caducado."
      );
    }
    if (!validarCVV) {
      throw Error("El CVV es incorrecto.");
    }
  }

  function handleSubmit() {
    try {
      if (dataOk()) {
        Alert.alert(
          "Donación exitosa",
          "Su donación de " + cantidad + "€ se ha enviado correctamente."
        );
        navigation.goBack();
      } else {
        getError();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }
  function handleCancel() {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="w-full h-full items-center bg-costas">
      <KeyboardAvoidingView className="h-full w-full pt-5">
        <ScrollView className="h-full w-full">
          <View className="flex flex-col w-full items-center justify-center space-y-5">
            {/* Contenedor cantidad*/}
            <View className="px-5 w-full">
              <TextInput
                className="w-full p-2 rounded-md border-2 bg-blanco border-ambiental"
                keyboardType="numeric"
                placeholder="Cantidad a donar*"
                onChangeText={(text) => setCantidad(text)}
              />
            </View>
            <View className="w-full px-5 items-start">
              <Text className="text-lg font-semibold text-ambiental">Método de pago:</Text>
            </View>
            {/* Botones metodos de pago*/}
            <RadioButton.Group
              className="items-start"
              value={metodo}
              onValueChange={(value) => setMetodo(value)}
            >
              <View className="flex flex-row items-center justify-start space-x-1">
                <RadioButton value="VISA" />
                <Image className="w-9 h-5" source={require("../../images/visa.png")}/>
                <Text>VISA</Text>
              </View>
              <View className="flex flex-row items-center justify-start space-x-1">
                <RadioButton value="MASTERCARD" />
                <Image className="w-9 h-5" source={require("../../images/mastercard.jpg")}/>
                <Text>MASTERCARD</Text>
              </View>
              <View className="flex flex-row items-center justify-start space-x-1">
                <RadioButton value="PAYPAL" />
                <Image className="w-9 h-5" source={require("../../images/paypal.png")} resizeMode="stretch"/>
                <Text>PAYPAL</Text>
              </View>
            </RadioButton.Group>
            {/* Contenedor datos de pago */}
            <View className="px-5 w-full h-2 border-t-2 border-ambiental"></View>
            <View className="w-full px-5 pt-7 space-y-2">
              <View>
                <Text className="text-ambiental">Nº Tarjeta: </Text>
                <TextInput
                  className="w-6/12 mt-1 p-2 rounded-md border-2 bg-blanco border-ambiental"
                  maxLength={14}
                  placeholder="Ej: 4000-1234-5678"
                  keyboardType="numeric"
                  onChangeText={(text) => setNumTarjeta(formatCardNumber(text))}
                />
              </View>
              <View>
                <Text className="text-ambiental">Caducidad:</Text>
                <View className="flex flex-row w-full mt-1 space-x-2">
                  <TextInput
                    className="p-2 rounded-md border-2 bg-blanco border-ambiental" 
                    maxLength={2}
                    placeholder="MM"
                    keyboardType="numeric"
                    onChangeText={(text) => setMes(text)}
                  />
                  <TextInput
                    className="p-2 items-center justify-center rounded-md border-2 bg-blanco border-ambiental"
                    maxLength={2}
                    placeholder="AA"
                    keyboardType="numeric"
                    onChangeText={(text) => setAnyo(text)}
                  />
                </View>
              </View>
              <View>
                <Text className="text-ambiental">Código de seguridad:</Text>

                <TextInput
                  className="mt-1 w-1/5 p-2 rounded-md border-2 bg-blanco border-ambiental"
                  maxLength={3}
                  placeholder="Ej: 111"
                  keyboardType="numeric"
                  onChangeText={(text) => setCvv(text)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        {/* Contenedor Botones */}
        <View className="flex flex-row bottom-0 w-full py-3 px-5 justify-between">
          <TouchableOpacity
            className="bg-rojo justify-center items-center rounded-md px-4 py-2"
            onPress={handleCancel}
          >
            <Text className="text-blanco text-sm">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-28 bg-educacion justify-center items-center rounded-md px-4 py-2"
            onPress={handleSubmit}
          >
            <Text className="text-ambiental text-sm">Donar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Donation;
