import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Button, Icon } from 'react-native-elements'
import { theme } from "../tailwind.config";
import Slider from '@react-native-community/slider';

const ModalFiltros = ({isModalOpen,setIsModalOpen}) => {

    const[distancia,setDistancia] = useState('0');
    const[sliding, setSliding] = useState('Inactive');

    const modalStyle = {
        margin:20,
        borderRadius:16,
        paddingHorizontal:30,
        paddingVertical:20,
        backgroundColor: 'white',
        shadowColor : '#000',
        shadowOffset:{
            width : 0,
            heigth: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }

  return (
    <TailwindProvider>
      <Modal visible={isModalOpen} transparent={true} animationType={"slide"}>
        <Modal
          visible={isModalOpen} transparent={true} animationType={"fade"}>
          <View className="h-full w-full absolute bg-[#27272a] opacity-70"></View>
        </Modal>    
        <View className="justify-end flex-1">
          <View style={modalStyle}>
            <View className="justify-between flex-row items-center">
              <Text className="font-bold text-xl">Filtros</Text>
              <Icon
                name="x"
                type="octicon"
                color={theme.colors.bottomTabs}
                size={32}
                onPress={() => setIsModalOpen(!isModalOpen)}
              />
            </View>
            <View>
              <View>
                <Text className="font-bold">Distancia</Text>
                <Text className="text-xs">0 - {distancia} km</Text>
                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={0}
                  maximumValue={100}
                  value={20}
                  onValueChange={(value) => setDistancia(parseInt(value))}
                  onSlidingStart={() => setSliding("Sliding")}
                  onSlidingComplete={() => setSliding("Inactive")}
                />
              </View>
              <View>
                  <TouchableOpacity>
                      <Text>Fecha</Text>
                  </TouchableOpacity>
              </View>
              <View>
                <Text className="font-bold">Duracion</Text>
              </View>
            </View>

            <Button
              title="Filtrar"
              onPress={() => setIsModalOpen(!setIsModalOpen)}
            />
          </View>
        </View>
      </Modal>
    </TailwindProvider>
  );
}

export default ModalFiltros