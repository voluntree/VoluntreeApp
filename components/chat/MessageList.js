import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import MyMessage from "./MyMessage";
import NotMyMessage from "./NotMyMessage";
import { useState } from "react";

const MessageList = (props) => {
  const currentUser = props.usuario;
  const [mensajes, setMensajes] = useState(props.messages);

  const mensajeItem = (m) => {
    if (m.user.dni == currentUser.dni) return <MyMessage message={m} />;
    else return <NotMyMessage message={m} />;
  };

  return (
    <FlatList
      className="w-screen bg-[#transparent] "
      data={mensajes}
      renderItem={({ item }) => mensajeItem(item)}
      inverted
      contentContainerStyle={{ flexDirection: "column-reverse" }}
    />)
};

export default MessageList;
