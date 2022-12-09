import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";
import { addToCarrito, removeFromCarrito } from "../../features/carritoSlice";
import { useDispatch } from "react-redux";

const TarjetaProducto = (props) => {
  const [uri, setUri] = useState();
  const { producto } = props;
  const width = Dimensions.get("screen").width / 2 - 30;
  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/productos/" + producto.imagen
  );
  getDownloadURL(reference).then((path) => {
    setUri(path);
  });

  const dispatch = useDispatch();
  const addProduct = () => {
    dispatch(addToCarrito({ props }));
  };

  const removeProduct = () => {
    dispatch(removeFromCarrito(producto.index))
  }

  return (
    <View
      style={{ width: width }}
      className="h-auto my-1 rounded bg-costas mx-1 border-2 border-ambiental"
    >
      <View className="px-2 justify-between rounded-t bg-[#fff] items-center flex-row py-2">
        <Text className="font-semibold">{producto.precio} pts.</Text>
        <View className = "flex-row space-x-2">
          <TouchableOpacity >
            <View className="rounded-full bg-costas h-8 w-8 justify-center">
              <Icon color={theme.colors.ambiental} name="add" />
            </View>
          <Text>0</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <View className="rounded-full bg-costas h-8 w-8 justify-center">
              <Icon color={theme.colors.ambiental} name="add" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        className="bg-[#fff] pb-2"
        style={{ height: 100, alignItems: "center" }}
      >
        <Image
          className="w-64 h-fit"
          source={{ uri: uri }}
          style={{ flex: 1, resizeMode: "contain" }}
        />
      </View>
      <View className="">
        <Text className=" text-start p-1 font-bold text-ambiental">
          {producto.nombre}
        </Text>
        <Text className="p-2 text-[11px] text-ambiental">
          {producto.descripcion}
        </Text>
      </View>
    </View>
  );
};

export default TarjetaProducto;
