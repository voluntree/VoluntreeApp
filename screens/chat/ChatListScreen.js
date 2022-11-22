import { View, Text, FlatList } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { where } from "firebase/firestore";
import { getVoluntarioByID } from "../../service/service";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ChatListScreen = () => {
  currentUser = "Catalin";
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const q = query(
    collection(db, "actividades"),
    where("participantes", "array-contains", currentUser)
  );
  useEffect(() => {
    onSnapshot(q, (snap) => {
      const acts = [];
      snap.forEach((actividad) => acts.push(actividad.data().titulo));
      setChats(acts);
    });
  });

  function openChat(actividad) {
    navigation.navigate("Chat Actividad", {
      actividad: actividad,
    });
  }

  return (
    <SafeAreaView>
      <Text>Chats</Text>
      <FlatList
        data={chats}
        renderItem={ (item) =>
          <TouchableOpacity onPress={openChat(item)}>
            <Text>{actividad}</Text>
          </TouchableOpacity>
        }
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;
