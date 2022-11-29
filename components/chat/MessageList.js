import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import MyMessage from "./MyMessage";
import NotMyMessage from "./NotMyMessage";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";

const MessageList = (props) => {
  useEffect(() => {
    onSnapshot(
      collection(db, `chats/${actividad}/messages`),
      (snapshot) => (
        {
          id: snapshot.id,
        },
        setMensajes(snapshot.docs.map((doc) => doc.data()))
      )
    );
  }, []);
  const actividad = props.actividad;
  const currentUser = props.usuario;
  const [mensajes, setMensajes] = useState([]);

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
    />
  );
};

export default MessageList;
