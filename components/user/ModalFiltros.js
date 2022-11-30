import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { Button, Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";
import Slider from "@react-native-community/slider";
import DateTimePicker from "react-native-modal-datetime-picker";
import ListaFiltros from "./ListaFiltros";
import { Dropdown } from "react-native-element-dropdown";
import { FAIcon, FDIcon, AZIcon, ZAIcon } from "../../icons/Icons";

const ModalFiltros = (props) => {
  const [duracionLocal, setDuracionLocal] = useState(props.duracion);
  const [distanciaLocal, setDistanciaLocal] = useState(props.distancia);
  const [categoriasActivasLocales, setCategoriasActivasLocales] = useState(
    props.categoriasActivas
  );
  const [localDateValue, setLocalDateValue] = useState();
  const [localText, setLocalText] = useState("Vacío");
  const [localOrder, setLocalOrder] = useState(props.order);

  const data = [
    {
      label: "Fecha (Más recientes)",
      value: 1,
      icon: FAIcon(24, 24, theme.colors.ambiental),
    },
    {
      label: "Fecha (Más antiguas)",
      value: 2,
      icon: FDIcon(24, 24, theme.colors.ambiental),
    },
    {
      label: "Alfabeticamente (A-Z)",
      value: 3,
      icon: AZIcon(24, 24, theme.colors.ambiental),
    },
    {
      label: "Alfabeticamente (Z-A)",
      value: 4,
      icon: ZAIcon(24, 24, theme.colors.ambiental),
    },
  ];

  const showDatePicker = () => {
    props.setIsVisible(true);
  };
  const hideDatePicker = () => {
    props.setIsVisible(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    getFecha(date);
  };

  const getFecha = (selectedDate) => {
    const currentDate = selectedDate || localDateValue;
    setLocalDateValue(selectedDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setLocalText(fDate);
  };

  const showMode = (currentMode) => {
    props.setShow(true);
    props.setMode(currentMode);
  };

  return (
    <TailwindProvider>
      {/*Modal*/}
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
          <View className="h-full w-full absolute bg-[#27272a] opacity-20"></View>
        </Modal>
        {/*Contenedor Global*/}
        <View className="justify-end flex-1">
          {/*Contenedor Contenido*/}
          <View className="flex bg-blanco rounded-t-3xl p-5 justify-items-center space-y-4 pb-8">

            {/* Tab Superior */}
            <TouchableOpacity className = "items-center h-8" onPress={() => {props.setIsModalOpen(false)}}>
              <View className = "h-1 w-12 bg-deportivo rounded-full"></View>
            </TouchableOpacity>

            {/* Titulo Filtros */}
            <View className="justify-center flex-row items-center">
              <Text
                className="text-xl"
                style={{ color: theme.colors.ambiental }}
              >
                Filtros
              </Text>
            </View>

            {/* Selector orden */}
            <View className = "mx-2">
              <Dropdown 
                className = "h-10 border-deportivo rounded-lg p-2 justify-center"
                style = {{backgroundColor: (localOrder != 0) ? theme.colors.deportivo : null,
                          borderWidth: (localOrder != 0) ? 0 : 2}}
                activeColor = {theme.colors.deportivo}
                data={data}
                labelField="label"
                valueField="value"
                placeholder = "Ordenar por:"
                value={localOrder}
                onChange={(item) => setLocalOrder(item.value)}
                renderItem={renderItem}
                placeholderStyle = {{color: theme.colors.ambiental, fontSize: 16}}
                renderLeftIcon = {
                  () => (<Icon className = "mr-2"
                               name="three-bars"
                               type="octicon"
                               color={theme.colors.ambiental}
                               size={18}/>)}
                containerStyle = {{ borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                  }}
                itemContainerStyle = {{ borderRadius: 4 }}
                selectedTextStyle = {{ color: theme.colors.ambiental}}   
                iconColor = {theme.colors.ambiental}      
                iconStyle = {{width: 30}}                       
              />
            </View>

            {/*Contenedor Fecha */}
            <TouchableOpacity className = "mx-2 h-10 justify-center border-deportivo rounded-lg p-2" 
                              style = {{backgroundColor: (localText != "Vacío") ? theme.colors.deportivo : null,
                                        borderWidth: (localText != "Vacío") ? 0 : 2}}
                              onPress={() => showDatePicker()}>
              <View className="flex-row items-center justify-between">
              <View className = "flex-row space-x-2">
              <Icon
                  name="calendar"
                  type="octicon"
                  color={theme.colors.ambiental}
                  size={20}
                />
                <Text className="text-base text-ambiental">Fecha: {localText}</Text>
                </View>
                <Icon
                  name="chevron-down"
                  type="octicon"
                  color={theme.colors.ambiental}
                  size={22}
                />
              </View>
            </TouchableOpacity>
            {/* DatePicker*/}
            <DateTimePicker
              isVisible={props.isVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            {/*Contenedor Distancia */}
            <View className = "space-y-4">
              <Text className="text-ambiental font-normal text-base mx-2">Distancia : 0 - {distanciaLocal} km</Text>
              <Slider 
                thumbTintColor = {theme.colors.ambiental}
                minimumTrackTintColor = {theme.colors.costas} 
                maximumTrackTintColor = {theme.colors.comunitario}
                minimumValue={0}
                maximumValue={100}
                value={distanciaLocal}
                onValueChange={(value) => {
                  if (props.sliding == "Inactive") {
                    setDistanciaLocal(parseInt(value));
                  }
                }}
                onSlidingStart={() => props.setSliding("Sliding")}
                onSlidingComplete={() => props.setSliding("Inactive")}
              />
            </View>

            {/*Contenedor Duración */}
            <View className="space-y-4">
              <Text className=" text-ambiental font-normal text-base mx-2">Duración máxima : {duracionLocal}h</Text>
              <Slider 
                thumbTintColor = {theme.colors.ambiental}
                minimumTrackTintColor = {theme.colors.costas} 
                maximumTrackTintColor = {theme.colors.comunitario}
                minimumValue={0}
                maximumValue={6}
                value={duracionLocal}
                onValueChange={(value) => {
                  if (props.sliding == "Inactive") {
                    setDuracionLocal(parseInt(value.toFixed(0).toString()));
                  }
                }}
                onSlidingStart={() => props.setSliding("Sliding")}
                onSlidingComplete={() => props.setSliding("Inactive")}
              />
            </View>

            {/* Contenedor Categorias */}
            <View className = "mx-2 mb-14">
              <Text className="text-base text-ambiental mb-4">Categoría:</Text>
              <ListaFiltros 
                setCategoriasActivasLocales={setCategoriasActivasLocales}
                lista={categoriasActivasLocales}
              />
            </View>

              {/* Contenedor Botón Filtrar */}
              <View className = "items-center">
                <TouchableOpacity className = "h-10 w-36 bg-costas justify-center items-center rounded-lg"
                  onPress={() => {
                    props.setIsModalOpen(!props.setIsModalOpen);
                    props.setDuracion(duracionLocal);
                    props.setDistancia(distanciaLocal);
                    props.setCategoriasActivas(categoriasActivasLocales);
                    props.setDateValue(localDateValue);
                    props.setText(localText);
                    props.setOrder(localOrder);
                  }}
                >
                  <Text className="text-base text-ambiental">Aplicar</Text>
                </TouchableOpacity>
              </View>

              {/* Contedor Botón Restablecer */}
              <View className = "items-center">
                <TouchableOpacity className = "h-10 w-36 justify-center items-center rounded-lg"
                  onPress={() => {
                    props.setIsModalOpen(!props.setIsModalOpen);
                    props.setDistancia(0);
                    props.setDateValue(undefined);
                    props.setDuracion(0);
                    props.setCategoriasActivas([]);
                    props.setText("Vacío");
                    props.setOrder(0);
                    setDistanciaLocal(0);
                    setCategoriasActivasLocales([]);
                    setDuracionLocal(0);
                    setLocalDateValue(undefined);
                    setLocalText("Vacío");
                    setLocalOrder(0);
                  }}
                >
                  <Text className="text-base text-ambiental">Restablecer</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>
    </TailwindProvider>
  );
};

export default ModalFiltros;

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    height: 40,
    width: 270,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    <View className="flex-row items-center space-x-2 px-2 py-1">
      <View className="">{item.icon}</View>
      <Text className = "text-ambiental">{item.label}</Text>
    </View>
  );
};
