import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { Icon } from "react-native-elements";
import { CartIcon } from "../../icons/Icons";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import { theme } from "../../tailwind.config";
import { useState } from "react";
import TarjetaProducto from "./TarjetaProducto";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { isEmpty } from "@firebase/util";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, db, storage } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import PopUpCarrito from "./PopUpCarrito";

const Tienda = () => {
  const categorias = ["TOTEBAGS", "CANTIMPLORAS", "GORRAS", "CAMISETAS"];

  const [productos, setProductos] = useState();
  const currentUser = auth.currentUser;
  const [usuario, setUsuario] = useState([]);

  const [q, setQuery] = useState(query(collection(db, "productos")));

  useEffect(() => {
    onSnapshot(doc(db, "voluntarios", currentUser.uid), (doc) => {
      setUsuario(doc.data());
    });
      onSnapshot(q, (querySnapshot) => {
        if (!isEmpty(querySnapshot)) {
          const prods = [];
          querySnapshot.forEach((doc) => {
            prods.push(doc.data());
          });
          setProductos(prods);
        }
      });
  }, [q]);

  const [indice, setIndice] = useState(0);

  const ListaCategorias = () => {
    return (
      <ScrollView
        className="space-x-6 mt-4"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {categorias.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setIndice(index)}
          >
            <Text
              style={[
                {
                  fontSize: 12,
                  color: "gray",
                  fontWeight: "bold",
                },

                indice == index && {
                  color: theme.colors.ambiental,
                  paddingBottom: 5,
                  borderBottomWidth: 2,
                  borderColor: theme.colors.ambiental,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };


  return (
    <TailwindProvider>
      <PopUpCarrito />
      <SafeAreaView className="h-full flex px-6 bg-blanco">
        {/*HEADER*/}
        <View className="mt-20 flex-row justify-between">
          <View>
            <Text className="font-bold text-xl">WELCOME TO</Text>
            <Text className="font-bold text-3xl text-ambiental">
              VoluntreeShop
            </Text>
          </View>
          <View className="flex-row space-x-4">
            <View className="rounded-full items-center justify-center w-16 h-8 bg-costas">
              <Text className="text-ambiental text-xs">
                {usuario.puntos} pts
              </Text>
            </View>
            <TouchableOpacity>{CartIcon(24, 24)}</TouchableOpacity>
          </View>
        </View>
        {/*BUSCADOR*/}
        <View className="mt-10 flex-row">
          <View className="rounded bg-[#eee] items-center h-12 flex-row flex-1">
            <Icon name="search" size={24} className="ml-4" />
            <TextInput
              placeholder="Buscar"
              className="flex-1 font-base text-md"
            />
          </View>
          <TouchableOpacity className="bg-ambiental h-12 w-12 justify-center rounded ml-2">
            <Icon name="sort" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <ListaCategorias />
        <FlatList
        className = "mb-16"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          numColumns={2}
          data={productos}
          renderItem={({item}) => <TarjetaProducto producto={item}/>}
        />
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default Tienda;

const style = StyleSheet.create({
  listaCategorias: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
