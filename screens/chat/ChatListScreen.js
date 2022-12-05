import { Text, TextInput, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../../utils/firebase";
import { getUsersChatsList, getVoluntarioByID } from "../../service/service";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ChatListItem from "../../components/chat/ChatListItem";
import { query } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { theme } from "../../tailwind.config";

const ChatListScreen = () => {
  const currentUser = auth.currentUser;
  const [userDetails, setUser] = useState({});
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const q = query(collection(db, "actividades"),where("participantes","array-contains",currentUser.uid))

  useEffect(() => {
    async function getUser() {
      setUser(await getVoluntarioByID(currentUser.uid));
    }
    getUser();
    onSnapshot(q,(snapshot)=>({id: snapshot.id}, setChats(snapshot.docs.map(doc => doc.data()))))
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
          className="w-full h-10 rounded-md bg-costas p-2"
          placeholder="Chat"
          cursorColor = {theme.colors.ambiental}
          placeholderTextColor = {theme.colors.ambiental}
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
