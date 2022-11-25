import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatHeader = (props) => {
  return (
    <Text className="w-screen text-justify p-5 text-base font-semibold bg-comunitario">{props.titulo}</Text>
    
  )
}

export default ChatHeader