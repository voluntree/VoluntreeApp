import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Button, Icon } from 'react-native-elements'
import { theme } from "../tailwind.config";
import Slider from '@react-native-community/slider';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ListaFiltros from './ListaFiltros';

const ModalFiltros = ({isModalOpen,setIsModalOpen}) => {

    const[distancia,setDistancia] = useState('0');
    const[sliding, setSliding] = useState('Inactive');

    const [duracion, setDuracion] = useState("0");

    const[mode, setMode] = useState('date')
    const[dateValue, setDateValue] = useState();
    const[text, setText] = useState('Vacío')
    const[show, setShow] = useState(false);

    const[isVisible, setIsVisible] = useState(false);

    const showDatePicker = () => {
      setIsVisible(true);
    }
    const hideDatePicker = () => {
      setIsVisible(false);
    }

    const handleConfirm = (date) => {
      hideDatePicker();
      getFecha(date);
    }

    const getFecha = (selectedDate) => {
      const currentDate = selectedDate || dateValue;
      setDateValue(dateValue);
      
      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      setText(fDate)
    }

    const showMode = (currentMode) =>{
      setShow(true)
      setMode(currentMode)
    }

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
        <Modal visible={isModalOpen} transparent={true} animationType={"fade"}>
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
            <View className="pl-4 align-middle">
              <View className="pt-3">
                <View className="rounded-lg mr-3">
                  <View className="">
                    <View className="pl-4 flex-row items-baseline">
                      <Text className="font-bold text-base">Distancia: </Text>
                      <Text className="">0 - {distancia} km</Text>
                    </View>
                    <Slider
                      style={{ width: 280, height: 40 }}
                      minimumValue={0}
                      maximumValue={100}
                      value={0}
                      onValueChange={(value) => setDistancia(parseInt(value))}
                      onSlidingStart={() => setSliding("Sliding")}
                      onSlidingComplete={() => setSliding("Inactive")}
                    />
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={() => showDatePicker()}>
                    <View className="pl-4 flex-row items-center justify-between pr-7">
                      <View className="flex-row items-center">
                        <Text className="font-bold text-base">Fecha: </Text>
                        <Text>{text}</Text>
                      </View>
                      <Icon
                        name="chevron-right"
                        type="octicon"
                        color={theme.colors.bottomTabs}
                        size={22}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  isVisible={isVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />

                <View className="pt-2">
                  <View className="flex-row items-baseline">
                    <Text className="pl-4 font-bold text-base">Duracion: </Text>
                    <Text className="">{duracion}h</Text>
                  </View>
                  <Slider
                    style={{ width: 280, height: 40 }}
                    minimumValue={0}
                    maximumValue={6}
                    value={0}
                    onValueChange={(value) => setDuracion(parseInt(value))}
                    onSlidingStart={() => setSliding("Sliding")}
                    onSlidingComplete={() => setSliding("Inactive")}
                  />
                </View>
                <View>
                  <Text className = "pl-4 font-bold text-base mb-2">Categoria:</Text>
                  <ListaFiltros />
                </View>
              </View>
            </View>
            <View className="items-end px-4 pt-4">
              <TouchableOpacity onPress={() => {setIsModalOpen(!setIsModalOpen), setText("-"), setDuracion("0")}}>
                <Text className="font-bold text-xl">Filtrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TailwindProvider>
  );
}

export default ModalFiltros