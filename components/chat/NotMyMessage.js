import { View, Text } from "react-native";
import React from "react";

const NotMyMessage = (props) => {
  const { message } = props;
  return (
    <View className="flex-col flex-wrap h-auto w-auto w-max-80 bg-[#d1d1d1] rouded-md left-2">
      <Text>
        {message.usuario.nombre} {message.usuario.apellidos}
      </Text>
      <Text>{message.mensaje}</Text>
    </View>
  );
};

export default NotMyMessage;