import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import { Image } from "react-native-elements";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

const PopUp = ({ cuantia, num, usuario }) => {
  const [visible, setVisible] = useState("false");

  const comprobarYactualizar = () => {
    if(usuario.puntos<cuantia){alert("No tienes puntos suficientes"); return}
    else{
        const docRef = doc(db, "voluntarios", auth.currentUser.uid)
        updateDoc(docRef, {
            puntos: usuario.puntos-cuantia
        }).then(setVisible(true)).then(timeout(2000))

    }
    
    
  };

  const timeout = (tiempo) => {
    setTimeout(() => setVisible(false), tiempo);
  };
  return (
    <>
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.modalBackGround}>
          <View className="space-y-2" style={styles.modalContainer}>
            <Image
              className="w-20 h-20"
              source={require("../../images/pedido.png")}
            />
            <Text> Pedido realizado con éxito</Text>
          </View>
        </View>
      </Modal>
      <View className="absolute bottom-8 z-50 w-full">
        <TouchableOpacity
          onPress={() => {
            comprobarYactualizar();
          }}
          className="mx-5 p-4 flex-row items-center space-x-1 bg-ambiental opacity-90 rounded-lg"
        >
          <Text className="pl-2 text-lg font-extrabold text-[#fff]">{num}</Text>
          <Text className="text-lg flex-1 text-center font-extrabold text-[#fff]">
            Canjear
          </Text>
          <Text className="text-lg font-extrabold text-[#fff]">
            {cuantia} pts
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
    alignItems: "center",
  },
});
