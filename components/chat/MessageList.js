import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import MyMessage from "./MyMessage";
import NotMyMessage from "./NotMyMessage";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import ShowDate from "./ShowDate";


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

  const mensajeItem = (item) => {
    if(item.type && item.type === 'day'){
      return <ShowDate date={item.date}/>
    }else{
      if (item.user.dni == currentUser.dni) return <MyMessage message={item} />;
      else return <NotMyMessage message={item} />;
    }
    
  };

  function agruparPorDias(messages){
    return messages.reduce((accumulator, element, index) => {
      const messageDay = new Date(element.date).getDate() + "/" 
                       + (new Date(element.date).getMonth() + 1) + "/"
                       + new Date(element.date).getFullYear()
      if (accumulator[messageDay]){
        return {...accumulator, [messageDay]: accumulator[messageDay].concat([element])}
      }
      return {...accumulator, [messageDay]: [element]}
    }, {})
  }

  function generarItems(messages){
    const days = agruparPorDias(messages);
    const sortedDays = Object.keys(days).sort(
      (x, y) => x - y
    )
    const items = sortedDays.reduce((accumulator, date) => {
      const sortedMessages = days[date].sort(
        (x, y) => new Date(x.date) - new Date(y.date)
      )
      return accumulator.concat([{type: 'day', date, id: date} ,...sortedMessages])
    }, [])
    return items;
  }

  return (
    <FlatList
      className="w-screen bg-[#transparent] "
      data={generarItems(mensajes).reverse()}
      renderItem={({ item }) => mensajeItem(item)}
      initialNumToRender={14} 
      inverted={-1}
      key = {(items) => items.date}
    />
  );
};

export default MessageList;
