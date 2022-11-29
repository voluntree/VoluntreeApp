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
import { onSnapshot, collection } from "firebase/firestore";
import MessageInput from "../../components/chat/MessageInput";
import { db } from "../../utils/firebase";


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
    onSnapshot(collection(db, `chats/${actividad}/messages`), (snapshot) =>({
      id: snapshot.id
    }, setMensajes(snapshot.docs.map(doc=> doc.data()))))
  }, []);

  return (
    <View className="h-screen w-screen bg-[#dbffdf]">
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
