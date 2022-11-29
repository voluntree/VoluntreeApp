import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { where } from "firebase/firestore";
import { getImageDownloadURL, getUsersChatsList, getVoluntarioByID } from "../../service/service";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ChatListScreen = () => {
  const currentUser = auth.currentUser;
  const [userDetails, setUser] = useState({})
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function getChats() {
      console.log(currentUser.email);
      let lista = await getUsersChatsList(currentUser.uid);
      setChats(lista);
      setUser(await getVoluntarioByID(currentUser.uid));
    }
    getChats();
  }, []);

  function openChat(actividad) {
    navigation.navigate("Chat Actividad", {
      actividad: actividad.titulo,
      user: currentUser.uid,
      userDetails: userDetails
    });
  }

  const itemLista = (item) => {
    const src = ""; 
    getImageDownloadURL("cardImages/")
    return (
      <TouchableOpacity className="flex-row h-10 items-start justify-start bg-cultural p-2" key={item} onPress={() => openChat(item)}>
        <Image />
        <Text className="text-base font-semibold">{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="h-full w-full p-2">
      <Text className="text-lg font-semibold">Chats</Text>
      {chats.map((c) => {return itemLista(c)})}
    </SafeAreaView>
  );
};

export default ChatListScreen;
