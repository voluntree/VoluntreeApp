import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Button, Icon } from 'react-native-elements'
import { theme } from "../tailwind.config";
import Slider from '@react-native-community/slider';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ListaFiltros from './ListaFiltros';

const ModalFiltros = (props) => {
    
    const showDatePicker = () => {
      props.setIsVisible(true);
    }
    const hideDatePicker = () => {
      props.setIsVisible(false);
    }

    const handleConfirm = (date) => {
      hideDatePicker();
      getFecha(date);
    }

    const getFecha = (selectedDate) => {
      const currentDate = selectedDate || props.dateValue;
      props.setDateValue(selectedDate);
      
      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      props.setText(fDate)
    }

    const showMode = (currentMode) =>{
      props.setShow(true)
      props.setMode(currentMode)
    }

    const modalStyle = {
        margin:20,
        borderRadius:16,
        paddingHorizontal:15,
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
      <Modal visible={props.isModalOpen} transparent={true} animationType={"slide"}>
        <Modal visible={props.isModalOpen} transparent={true} animationType={"fade"}>
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
                onPress={() => {
                  props.setIsModalOpen(!props.isModalOpen)
                  props.setDistancia(0)
                  props.setDateValue(undefined)
                  props.setDuracion(0)
                  props.onCategoriasActivasChange([])
                  props.setText("Vacío")
                }}
              />
            </View>
            <View className="pl-4 align-middle">
              <View className="pt-3">
                <View className="rounded-lg mr-3">
                  <View className="">
                    <View className="pl-4 flex-row items-baseline">
                      <Text className="font-bold text-base">Distancia: </Text>
                      <Text className="">0 - {props.distancia} km</Text>
                    </View>
                    <Slider
                      style={{ width: 280, height: 40 }}
                      minimumValue={0}
                      maximumValue={100}
                      value={props.distancia}
                      onValueChange={(value) => props.setDistancia(parseInt(value))}
                      onSlidingStart={() => props.setSliding("Sliding")}
                      onSlidingComplete={() => props.setSliding("Inactive")}
                    />
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={() => showDatePicker()}>
                    <View className="pl-4 flex-row items-center justify-between pr-7">
                      <View className="flex-row items-center">
                        <Text className="font-bold text-base">Fecha: </Text>
                        <Text>{props.text}</Text>
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
                  isVisible={props.isVisible}
                  mode="date"
                  onChange={handleConfirm}
                  onConfirm ={handleConfirm}
                  onCancel={hideDatePicker}
                />

                <View className="pt-2">
                  <View className="flex-row items-baseline">
                    <Text className="pl-4 font-bold text-base">Duracion: </Text>
                    <Text className="">{props.duracion}h</Text>
                  </View>
                  <Slider
                    style={{ width: 280, height: 40 }}
                    minimumValue={0}
                    maximumValue={6}
                    value={props.duracion}
                    onValueChange={(value) => props.setDuracion(parseInt(value))}
                    onSlidingStart={() => props.setSliding("Sliding")}
                    onSlidingComplete={() => props.setSliding("Inactive")}
                  />
                </View>
                <View>
                  <Text className = "pl-4 font-bold text-base mb-2">Categoria:</Text>
                  <ListaFiltros 
                    onCategoriasActivasChange = {props.onCategoriasActivasChange}
                    lista = {props.categoriasActivas}/>
                </View>
              </View>
            </View>
            <View className="items-end px-4 pt-4">
              <TouchableOpacity onPress={() => {props.setIsModalOpen(!props.setIsModalOpen)}}>
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