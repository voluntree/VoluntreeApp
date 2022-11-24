import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { where } from "firebase/firestore";
import { getUsersChatsList, getVoluntarioByID } from "../../service/service";
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
      let lista = await getUsersChatsList(currentUser.email);
      setChats(lista);
      setUser(await getVoluntarioByID(currentUser.uid));
    }
    getChats();
  }, []);

  function openChat(actividad) {
    navigation.navigate("Chat Actividad", {
      actividad: actividad,
      user: currentUser.uid,
      userDetails: userDetails
    });
  }

  const itemLista = (item) => {
    return (
      <TouchableOpacity key={item} onPress={() => openChat(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <Text>Chats</Text>
      {chats.map((c) => {return itemLista(c)})}
    </SafeAreaView>
  );
};

export default ChatListScreen;
