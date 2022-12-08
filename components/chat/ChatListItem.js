import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../utils/firebase";
import {
  getImageDownloadURL,
  retrieveChatLastMessage,
} from "../../service/service";
import { onSnapshot, collection } from "firebase/firestore";

const ChatListItem = (props) => {
  const currentUser = auth.currentUser;
  const item = props.item;
  const userDetails = props.user;
  const [lastMsg, setLastMsg] = useState("");
  const [img, setImg] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    initData();
    onSnapshot(
      collection(db, `chats/${item.titulo}/messages`), (snapshot) => {
        let msg = "";
        if(!snapshot.empty) msg = snapshot.docs[snapshot.docs.length - 1].data()
        setLastMsg(msg)
      }
    );
  }, []);

  async function initData() {
    let src = await getImageDownloadURL("cardImages/" + item.imagen);
    setImg(src);
    console.log("runnig useEffect of chatListItem");
  }

  function openChat(actividad) {
    navigation.navigate("Chat Actividad", {
      actividad: actividad.titulo,
      user: currentUser.uid,
      userDetails: userDetails,
    });
  }

  function formatLastMessage(message){
    return message.length > 30 ? (message.substring(0,30)+"..."):(message);
  }

  return (
    <TouchableOpacity
      className="flex-row h-auto items-start justify-start bg-[#transparent] p-2"
      key={item.titulo}
      onPress={() => openChat(item)}
    >
      {img && (
        <Image source={{ uri: img }} className="h-12 w-12 rounded-full" />
      )}
      <View className="flex-col px-2">
        <Text className="text-base">{item.titulo}</Text>
        {lastMsg ? (
          <View className="flex-row">
            <Text className="font-semibold text-ambiental">
              {lastMsg.user.dni == userDetails.dni ? "Tú" : lastMsg.user.nombre}
              :
            </Text>
            <Text className="text-ambiental"> {formatLastMessage(lastMsg.message)}</Text>
          </View>
        ) : (
          <Text className="text-ambiental">Aún no hay mensajes</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
