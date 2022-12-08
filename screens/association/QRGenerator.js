import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { stringToHash } from "./../../service/functions";
import { useLayoutEffect } from "react";
import { theme } from "../../tailwind.config";

const QRGenerator = () => {
  const route = useRoute();
  const { actividad } = route.params;
  const navigation = useNavigation();

  const [item, setItem] = useState(stringToHash(actividad.titulo));
  const [productQRref, setProductQRref] = useState();

  return (
    <SafeAreaView className="flex w-full h-full bg-blanco items-center space-y-12 justify-start">
      <View className="flex-row w-full h-auto items-center space-x-2 p-1">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="flex h-14 w-14 items-center justify-center"
        >
          <Icon
            className="h-full w-full items-center justify-center"
            name="chevron-left"
            type="octicon"
            color={theme.colors.ambiental}
            size={20}
          />
        </TouchableOpacity>
        <Text className="text-ambiental font-bold text-xl">Código QR</Text>
      </View >
      
        <Text className="font-bold text-ambiental text-xl p-2 rounded-lg bg-costas">
          {actividad.titulo}
        </Text>
        <View className="p-3 rounded-lg bg-blanco">
          <QRCode
            value={item}
            size={250}
            color={theme.colors.ambiental}
            backgroundColor={theme.colors.blanco}
            getRef={(c) => setProductQRref(c)}
          />
        </View>
        <View className="p-3 rounded-lg bg-costas items-center">
          <Text className="text-ambiental text-sm">Código manual:</Text>
          <Text className="text-ambiental text-xl">
            {stringToHash(actividad.titulo)}
          </Text>
        </View>
    </SafeAreaView>
  );
};

export default QRGenerator;
