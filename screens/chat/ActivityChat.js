import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageList from "../../components/chat/MessageList";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { retrieveChatMessages, sendUserMessage } from "../../service/service";
import { Icon } from "react-native-elements";
import { onSnapshot } from 'firebase/firestore';

const ActivityChat = () => {
  const { actividad } = useRoute().params;
  const [mensajes, setMensajes] = useState([])
  const [textoActual, setTextoActual] = useState("");
  const currentUser = "";
    useEffect(()=>{
        async function retrieveMessages(){
            const data = await retrieveChatMessages(actividad);
            setMensajes(data);
        }
        retrieveMessages();
    })

  const sendMessage = () => {
    if(textoActual.trim().length != 0 ) {
        sendUserMessage(currentUser, textoActual, Date.now());
    }
  };

  const MessageInput = () => {
    return (
      <View classname="flex-row h-14 w-full bg-transparent items-center justify-around">
        <TextInput
          className="h-14 w-80 h-max-24"
          value={textoActual}
          onChangeText={(text) => setTextoActual(text)}
          
        />
        <TouchableOpacity className="h-14 w-16 bg-bottomTabs" onPress={sendMessage}>
          <Icon name="paper-airplane" type="octicon"/>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="h-full w-full">
      <View>
        <Text>{actividad}</Text>
      </View>
      <View className="h-auto">
        {mensajes.length != 0 && <MessageList messages={mensajes} />}
        <MessageInput />
      </View>
    </SafeAreaView>
  );
};

export default ActivityChat;
