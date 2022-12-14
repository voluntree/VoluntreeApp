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
    paddingHorizontal: 20,
    paddingVertical: 10,
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
        animationType="fade"
      >
        <Modal
          visible={props.isModalOpen}
          transparent={true}
         
        >
          <View className="h-full w-full absolute bg-[#ffffff] opacity-70"></View>
        </Modal>
        <View className="flex-1 justify-center items-center">
          <View className="space-y-4 rounded-xl bg-[#fff] items-center w-10/12 pb-6" style={modalStyle}>
            <View className="justify-center w-full flex-row items-center">
              <Text className="font-bold text-lg text-ambiental">Opciones</Text>
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
              className="w-40 h-8 bg-[#EFF8F4] border-[1px] border-[#b0dac7] justify-center items-center rounded-lg" 
              onPress={props.onCerrarSesion}
            >
              <Text className="font-bold">Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="w-40 h-8 bg-[#EFF8F4] border-[1px] border-[#ff0000] justify-center items-center rounded-lg"
              onPress={props.onBorrarCuenta}
            >
              <Text className="font-bold color-[#ff0000]">Borrar Cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TailwindProvider>
  );
};

export default ModalPerfil;
