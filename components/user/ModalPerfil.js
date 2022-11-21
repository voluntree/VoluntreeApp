import { View, Modal, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";

const ModalPerfil = (props) => {
  const showMode = (currentMode) => {
    props.setShow(true);
    props.setMode(currentMode);
  };

  const modalStyle = {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      heigth: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  };

  return (
    <TailwindProvider>
      <Modal
        visible={props.isModalOpen}
        transparent={true}
        animationType={"slide"}
      >
        <Modal
          visible={props.isModalOpen}
          transparent={true}
          animationType={"fade"}
        >
          <View className="h-full w-full absolute bg-[#27272a] opacity-70"></View>
        </Modal>
        <View className="justify-end flex-1">
          <View style={modalStyle}>
            <View className="justify-center w-full flex-row items-center">
              <Text className="font-bold text-base">Opciones</Text>
              <View className="absolute right-0">
                <Icon
                  name="x"
                  type="octicon"
                  color={theme.colors.bottomTabs}
                  size={24}
                  onPress={() => {
                    props.setIsModalOpen(!props.isModalOpen);
                  }}
                />
              </View>
            </View>
            <TouchableOpacity 
              className="mb-1" 
              onPress={props.onCerrarSesion}
            >
              <View className="h-8 bg-[#F0F0F0] justify-center items-center">
                <Text className="font-bold">Cerrar Sesión</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onBorrarCuenta}>
              <View className="h-8 bg-[#F0F0F0] justify-center items-center">
                <Text className="font-bold color-[#ff0000]">Borrar Cuenta</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TailwindProvider>
  );
};

export default ModalPerfil;
