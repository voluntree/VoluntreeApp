import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageList from "../../components/chat/MessageList";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { retrieveChatMessages } from "../../service/service";
import { onSnapshot } from "firebase/firestore";
import MessageInput from "../../components/chat/MessageInput";


const ActivityChat = () => {
  const { actividad, currentUser, userDetails } = useRoute().params;
  const navigation = useNavigation();
  const [mensajes, setMensajes] = useState([]);
  const [textoActual, setTextoActual] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: actividad,
      headerMargin: 0,
    });
  }, []);

  useEffect(() => {
    async function retrieveMessages() {
      const data = await retrieveChatMessages(actividad);
      setMensajes(data);
    }
    retrieveMessages();
    console.log("Detalles: ", userDetails);
  }, []);

  return (
    <View className="h-screen w-screen bg-comunitario">
      <View className="flex-col h-[100%] ">
        <View className="w-screen h-full">
          {mensajes.length != 0 ? (
            <MessageList usuario={userDetails} actividad={actividad}/>
          ):(<View className="flex w-[100%] flex-1 items-center justify-center"><Text>No hay mensajes</Text></View>)}
          <MessageInput actividad={actividad} />
        </View>
      </View>
    </View>
  );
};

export default ActivityChat;
