import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Button, Icon } from 'react-native-elements'
import { theme } from "../tailwind.config";
import Slider from '@react-native-community/slider';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ListaFiltros from './ListaFiltros';
import { Dropdown } from 'react-native-element-dropdown';


const ModalFiltros = (props) => {
    
    const [duracionLocal, setDuracionLocal] = useState(props.duracion)
    const [distanciaLocal, setDistanciaLocal] =useState(props.distancia)
    const [categoriasActivasLocales, setCategoriasActivasLocales] = useState(props.categoriasActivas)
    const [localDateValue, setLocalDateValue] = useState()
    const [localText, setLocalText] = useState("Vacio")
    const [localOrder, setLocalOrder] = useState(props.order)
    
    const data = [{label: "Fecha(Más recientes)", value: 1}, 
                  {label: "Fecha(Más antiguas)" , value: 2}, 
                  {label: "Alfabeticamente(Ascendente)", value: 3}, 
                  {label: "Alfabeticamente(Descendente)", value: 4}]

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
      const currentDate = selectedDate || localDateValue;
      setLocalDateValue(selectedDate);
      
      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      setLocalText(fDate)
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
                }}
              />
            </View>
            <View className="pl-4 align-middle">
              <View className="pt-3">
                <View className="rounded-lg mr-3">
                  <View className="">
                    <View className="pl-4 flex items-baseline">
                    <Text className="font-bold text-base">Ordenar: </Text>
                    <Dropdown 
                      style = {{
                        marginTop: 10,
                        height: 40,
                        width: 270,
                        borderColor: theme.colors.bottomTabs,
                        borderWidth: 2,
                        borderRadius: 10,
                        padding: 5,

                      }}
                      data = {data}
                      labelField = "label"
                      valueField = "value"
                      placeholder= 'Selecciona una opción'
                      value={localOrder}
                      onChange= {(item) => setLocalOrder(item.value)}
                      renderItem = {renderItem}
                      >
                    </Dropdown>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="pl-4 align-middle">
              <View className="pt-3">
                <View className="rounded-lg mr-3">
                  <View className="">
                    <View className="pl-4 flex-row items-baseline">
                      <Text className="font-bold text-base">Distancia: </Text>
                      <Text className="">0 - {distanciaLocal} km</Text>
                    </View>
                    <Slider
                      style={{ width: 280, height: 40 }}
                      minimumValue={0}
                      maximumValue={100}
                      value={distanciaLocal}
                      onValueChange={(value) => {
                        if(props.sliding == "Inactive"){
                          setDistanciaLocal(parseInt(value))
                        }
                      }}
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
                        <Text>{localText}</Text>
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
                  onConfirm ={handleConfirm}
                  onCancel={hideDatePicker}
                />

                <View className="pt-2">
                  <View className="flex-row items-baseline">
                    <Text className="pl-4 font-bold text-base">Duracion: </Text>
                    <Text>{duracionLocal}h</Text>
                  </View>
                  <Slider
                    style={{ width: 280, height: 40 }}
                    minimumValue={0}
                    maximumValue={6}
                    value={duracionLocal}
                    onValueChange={(value) => {
                      if(props.sliding == "Inactive"){
                        setDuracionLocal(parseInt(value.toFixed(0).toString()))
                      }
                    }}
                    onSlidingStart={() => props.setSliding("Sliding")}
                    onSlidingComplete={() => props.setSliding("Inactive")}
                  />
                </View>
                <View>
                  <Text className = "pl-4 font-bold text-base mb-2">Categoria:</Text>
                  <ListaFiltros 
                    setCategoriasActivasLocales = {setCategoriasActivasLocales}
                    lista = {categoriasActivasLocales}/>
                </View>
              </View>
            </View>
            <View className="flex-row space-x-[125px] items-end px-4 pt-4">
              <TouchableOpacity onPress={() => {
                  props.setIsModalOpen(!props.setIsModalOpen)
                  props.setDistancia(0)
                  props.setDateValue(undefined)
                  props.setDuracion(0)
                  props.setCategoriasActivas([])
                  props.setText("Vacío")
                  props.setOrder(0)
                  setDistanciaLocal(0)
                  setCategoriasActivasLocales([])
                  setDuracionLocal(0)
                  setLocalDateValue(undefined)
                  setLocalText("Vacío")
                  setLocalOrder(0)
                  }}>
                <Text className="font-bold text-xl underline">Restablecer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                props.setIsModalOpen(!props.setIsModalOpen)
                props.setDuracion(duracionLocal)
                props.setDistancia(distanciaLocal)
                props.setCategoriasActivas(categoriasActivasLocales)
                props.setDateValue(localDateValue)
                props.setText(localText)
                props.setOrder(localOrder)}}>
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

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    height: 40,
    width: 270,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const renderItem = (item) => {
  return (
    <View>
      <Text>{item.label}</Text>
    </View>
  )
}