import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { collection, query, where, getDocs, doc, onSnapshot, firestore} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";
import { db } from "../../utils/firebase";
import ModalFiltros from "./ModalFiltros";

const Buscador = (props) => {    

  return (
    <View className="flex-row items-center space-x-2 mb-2">
      <View className="flex-row items-center rounded-md bg-costas justify-between px-2">
        <TextInput
          className="rounded-md w-4/5 h-10"
          style = {{color: theme.colors.ambiental}}
          placeholder="Buscar..."
          onChangeText={(value) => props.setSearchText(value,"searchText")}
          cursorColor = {theme.colors.ambiental}
          placeholderTextColor = {theme.colors.ambiental}
        />
        <Icon
          className=""
          name="search"
          type="octicon"
          color={theme.colors.ambiental}
          size={24}
          
        />
      </View>
      <View>
        <Icon
          name="quote"
          type="octicon"
          color={theme.colors.ambiental}
          size={24}
          onPress={() => props.setIsModalOpen(!props.isModalOpen)}
        />
      </View>
      <ModalFiltros
        isModalOpen = {props.isModalOpen}
        setIsModalOpen = {props.setIsModalOpen}
        setCategoriasActivas = {props.setCategoriasActivas}
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
        order = {props.order}
        setOrder = {props.setOrder}
      />
    </View>
  );
};

export default Buscador;
