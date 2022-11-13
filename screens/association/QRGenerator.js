import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { stringToHash } from "./../../service/functions";

const QRGenerator = () => {
  const route = useRoute();
  const { actividad } = route.params;
  const navigation = useNavigation();

  const [item, setItem] = useState(stringToHash(actividad.titulo));
  const [productQRref, setProductQRref] = useState();

  return (
    <SafeAreaView className="flex w-full h-full bg-[#e6e6e6] items-center space-y-12 justify-start">
      <View className="flex-row flex-wrap w-full h-auto items-center space-x-2 p-1 bg-bottomTabs">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="flex h-14 w-14 items-center justify-center"
        >
          <Icon
            className="h-full w-full items-center justify-center"
            name="arrow-left"
            type="octicon"
            color="black"
            size={28}
          />
        </TouchableOpacity>
        <Text className="font-bold text-xl">Código QR</Text>
      </View>
      <Text className="font-bold text-xl p-2 rounded-lg bg-blanco">
        {actividad.titulo}
      </Text>
      <View className="p-3 rounded-lg bg-blanco">
        <QRCode
          value={item}
          size={250}
          color="black"
          backgroundColor="white"
          getRef={(c) => setProductQRref(c)}
        />
      </View>
      <View className="p-3 rounded-lg bg-blanco items-center">
        <Text className="font-bold text-lg">Código manual:</Text>
        <Text className="font-bold text-xl">
          {stringToHash(actividad.titulo)}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default QRGenerator;
