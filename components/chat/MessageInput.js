import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import { sendUserMessage } from "../../service/service";
import { auth } from "../../utils/firebase";
import { useState } from "react";
import { colors, Icon } from "react-native-elements";
import { Dimensions } from "react-native";
import { theme } from "../../tailwind.config";

var width = Dimensions.get("window").width; //full width

const MessageInput = (props) => {
  const actividad = props.actividad;
  const userDetails = props.usuario;
  const [textoActual, setTextoActual] = useState("");
  const currentUser = auth.currentUser.uid;

  const sendMessage = () => {
    if (textoActual.trim().length != 0) {
      console.log("usuario del input", userDetails);
      sendUserMessage(userDetails, textoActual, Date.now(), actividad);
      setTextoActual("");
    }
  };

  return (
    <View className="flex-row w-full p-1 justify-around items-start bg-[#transparent]">
      <View className="flex-col w-[80%]">
        <TextInput
          className="h-12 bg-costas rounded-full px-4 text-md"
          style={{ color: theme.colors.ambiental }}
          value={textoActual}
          placeholder="Mensaje"
          onChangeText={(text) => setTextoActual(text)}
          cursorColor={theme.colors.ambiental}
          placeholderTextColor={theme.colors.ambiental}
        />
      </View>
      <View className="flex-col h-12 w-12">
        <TouchableOpacity
          className="h-12 w-12 bg-costas justify-center items-center rounded-full"
          onPress={sendMessage}
        >
          <Icon
            name="paper-airplane"
            type="octicon"
            color={theme.colors.ambiental}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageInput;
