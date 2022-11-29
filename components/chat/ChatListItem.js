import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../utils/firebase";
import {
  getImageDownloadURL,
  retrieveChatLastMessage,
} from "../../service/service";

const ChatListItem = (props) => {
  const currentUser = auth.currentUser;
  const item = props.item;
  const userDetails = props.user;
  const [lastMsg, setLastMsg] = useState("");
  const [img, setImg] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    async function initData() {
      let src = await getImageDownloadURL("cardImages/" + item.imagen);
      setImg(src);

      let msg = await retrieveChatLastMessage(item.titulo);
      setLastMsg(msg);
    }
    initData();
  }, []);

  function openChat(actividad) {
    navigation.navigate("Chat Actividad", {
      actividad: actividad.titulo,
      user: currentUser.uid,
      userDetails: userDetails,
    });
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
        {lastMsg && (
          <View className="flex-row">
            <Text className="font-semibold text-ambiental">
              {lastMsg.user.nombre}:
            </Text>
            <Text className="text-ambiental"> {lastMsg.message}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
