import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { collection, query, where, getDocs, doc, onSnapshot, firestore} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { theme } from "../tailwind.config";
import { db } from "../utils/firebase";
import ModalFiltros from "./ModalFiltros";

const Buscador = (props) => {    

  const onCategoriasActivasChange = (lista) => {
    props.setCategoriasActivas(lista)
  }

  return (
    <View className="flex-row items-center my-3 pt-2 space-x-4">
      <View className="flex-row items-center rounded-full bg-[#d6d5d5] justify-between">
        <TextInput
          className="bg-[#d6d5d5] rounded-full w-3/4 h-10 px-4"
          placeholder="Buscar..."
          onChangeText={(value) => props.setSearchText(value,"searchText")}
        />
        <Icon
          className="pr-2 z-10"
          name="search"
          type="octicon"
          color={theme.colors.bottomTabs}
          size={24}
          
        />
      </View>
      <View>
        <Icon
          name="filter"
          type="octicon"
          color={theme.colors.bottomTabs}
          size={24}
          onPress={() => props.setIsModalOpen(!props.isModalOpen)}
        />
      </View>
      <ModalFiltros
        isModalOpen = {props.isModalOpen}
        setIsModalOpen = {props.setIsModalOpen}
        onCategoriasActivasChange = {onCategoriasActivasChange}
        categoriasActivas = {props.categoriasActivas}
        distancia = {props.distancia}
        setDistancia = {props.setDistancia}
        text = {props.text}
        setText = {props.setText}
        isVisible = {props.isVisible}
        duracion = {props.duracion}
        setDuracion = {props.setDuracion}
        sliding = {props.sliding}
        setSliding = {props.setSliding}
        mode = {props.mode}
        setMode = {props.setMode}
        dateValue = {props.dateValue}
        setDateValue = {props.setDateValue}
        show = {props.show}
        setShow = {props.setShow}
        setIsVisible = {props.setIsVisible}
        onFiltrosChange = {props.onFiltrosChange}
      />
    </View>
  );
};

export default Buscador;
