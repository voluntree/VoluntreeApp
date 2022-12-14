import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { TextInput } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const Donation = () => {
  const navigation = useNavigation();
  const [cantidad, setCantidad] = useState(0);
  const [metodo, setMetodo] = useState(0);
  const [numTarjeta, setNumTarjeta] = useState(0);
  const [mes, setMes] = useState(0);
  const [anyo, setAnyo] = useState(0);
  const [cvv, setCvv] = useState(0);
  function dataOk() {
    const date = new Date();
    const validarNum = numTarjeta > 0;
    const validarMes = mes > 0 && mes < 13;
    const validarAnyo =
      date.getFullYear() - 2000 > anyo ||
      (date.getFullYear() - 2000 == anyo && date.getMonth() >= mes);
    if (validarNum && validarMes && validarAnyo) return true;
    else return false;
  }
  function handleSubmit() {
    if (dataOk()) {
      Alert.alert(
        "Donación exitosa",
        "Su donación de " + cantidad + "€ se ha enviado correctamente."
      );
    } else {
      Alert.alert(
        "Error",
        "Donación fallida, asegurese de rellenar todos los campos correctamente."
      );
    }
  }
  function handleCancel() {
    navigation.goBack();
  }
  return (
    <SafeAreaView className="flex flex-col h-full w-full items-center justify-center">
      {/* Contenedor cantidad y metodo de pago */}
      <View>
        <TextInput keyboardType="numeric" placeholder="Cantidad a donar*" />
        <Text>Método de pago:</Text>
        <ButtonGroup />
      </View>
      {/* Contenedor datos de pago */}
      <View>
        <TextInput
          placeholder="Ej: 4000-1234-5678 "
          keyboardType="numeric"
          onChangeText={(text) => setNumTarjeta(text)}
        />
        <View>
          <TextInput
            placeholder="MM"
            keyboardType="numeric"
            onChangeText={(text) => setMes(text)}
          />
          <TextInput
            placeholder="AA"
            keyboardType="numeric"
            onChangeText={(text) => setAnyo(text)}
          />
        </View>
        <TextInput
          placeholder="Ej: 111"
          keyboardType="numeric"
          onChangeText={(text) => setCvv(text)}
        />
      </View>
      {/* Contenedor Botones */}
      <View>
        <TouchableOpacity onPress={handleCancel}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Donar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Donation;
