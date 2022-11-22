import { View, Text, ScrollView } from "react-native";
import React from "react";
import MyMessage from "./MyMessage";
import NotMyMessage from "./NotMyMessage";
import { useState } from "react";

const MessageList = (props) => {
  const [mensajes, setMensajes] = useState(props.messages);

  return (
    <ScrollView>
      {mensajes.map((m) => {
        if (m.usuario.dni == currentUser.dni) return <MyMessage message={m} />;
        else return <NotMyMessage message={m} />;
      })}
    </ScrollView>
  );
};

export default MessageList;
