import {Text } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../../utils/firebase";
import {
  getUsersChatsList,
  getVoluntarioByID,
} from "../../service/service";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ChatListItem from "../../components/chat/ChatListItem";

const ChatListScreen = () => {
  const currentUser = auth.currentUser;
  const [userDetails, setUser] = useState({});
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
      userDetails: userDetails,
    });
  }


  return (
    <SafeAreaView className="h-full w-full p-2">
      <Text className="text-lg font-semibold m-2">Chats</Text>
      {chats.map((c) => {
        return <ChatListItem key={c.titulo} item={c} user={userDetails}/>;
      })}
    </SafeAreaView>
  );
};

export default ChatListScreen;
