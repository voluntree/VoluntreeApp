import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React from "react";
import { sendUserMessage } from "../../service/service";
import { auth } from "../../utils/firebase";
import { useState } from "react";
import { Icon } from "react-native-elements";
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width

const MessageInput = (props) => {
  const { actividad } = props;
  const [textoActual, setTextoActual] = useState("");
  const currentUser = auth.currentUser.uid;
  const sendMessage = () => {
    if (textoActual.trim().length != 0) {
      sendUserMessage(currentUser, textoActual, Date.now(), actividad);
      setTextoActual("")
    }
  };

  return (
    <View className="flex-row w-full p-1 justify-around items-start bg-[#transparent]">
      <View className="flex-col w-[80%]">
        <TextInput
          value={textoActual}
          placeholder="Mensaje"
          className="h-12 bg-blanco rounded-full px-4"
          onChangeText={(text) => setTextoActual(text)}
        />
      </View>
      <View className="flex-col h-12 w-12">
        <TouchableOpacity
          className="h-12 w-12 bg-bottomTabs justify-center items-center rounded-full"
          onPress={sendMessage}
        >
          <Icon name="paper-airplane" type="octicon" />
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default MessageInput;
