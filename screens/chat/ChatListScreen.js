import { Text, TextInput, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../../utils/firebase";
import { getUsersChatsList, getVoluntarioByID } from "../../service/service";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ChatListItem from "../../components/chat/ChatListItem";

const ChatListScreen = () => {
  const currentUser = auth.currentUser;
  const [userDetails, setUser] = useState({});
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [busqueda, setBusqueda] = useState("");

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
    <SafeAreaView className="flex items-center h-full w-full p-2 bg-blanco">
      <View className="w-full m-2 px-2">
        <TextInput
          className="w-full h-10 rounded-xl border-2 border-ambiental bg-costas p-3"
          placeholder="Chat"
          value={busqueda}
          onChangeText={(value) => setBusqueda(value)}
        />
      </View>
      <View className="w-full items-start">
        <Text className="text-lg font-semibold m-2">Chats</Text>
        {chats.map((c) => {
          if (
            c.titulo.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
          )
            return <ChatListItem key={c.titulo} item={c} user={userDetails} />;
        })}
      </View>
    </SafeAreaView>
  );
};

export default ChatListScreen;
