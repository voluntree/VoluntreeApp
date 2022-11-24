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
import MessageInput from "../../components/chat/MessageInput";

const ActivityChat = () => {
  const { actividad, currentUser, userDetails } = useRoute().params;
  const [mensajes, setMensajes] = useState([])
  const [textoActual, setTextoActual] = useState("");
  
    useEffect(()=>{
        async function retrieveMessages(){
            const data = await retrieveChatMessages(actividad);
            setMensajes(data);
        }
        retrieveMessages();
        console.log("Detalles: ",userDetails);
    },[])

  


  return (
    <SafeAreaView className="h-full w-full">
      <View>
        <Text>{actividad}</Text>
      </View>
      <View className="h-100 w-screen items-center border-x-2">
        {mensajes.length != 0 && <MessageList className="h-80" messages={mensajes} usuario={userDetails}/>}
        <MessageInput className="mx-2" actividad={actividad}/>
      </View>
    </SafeAreaView>
  );
};

export default ActivityChat;
