import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";
import { addToCarrito, removeFromCarrito, selectProductoCarritoConId } from "../../features/carritoSlice";
import { useDispatch, useSelector } from "react-redux";

const TarjetaProducto = (props) => {
  const [uri, setUri] = useState();
  const { producto } = props;
  const width = Dimensions.get("screen").width / 2 - 30;
  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/productos/" + producto.imagen
  );
  getDownloadURL(reference).then((path) => {
    setUri(path)
  });

  const[cantidad, setCantidad] = useState(0);
  const productos = useSelector((state) => selectProductoCarritoConId(state, producto.index));
  const dispatch = useDispatch();
  const addProduct = () => {
    dispatch(addToCarrito(producto));
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
        <Text className="font-semibold text-xs">{producto.precio} pts.</Text>
        <View className="flex-row justify-center space-x-2">
          <TouchableOpacity
            disabled={cantidad == 0}
            onPress={() => {
              removeProduct, setCantidad(cantidad - 1);
            }}
          >
            {cantidad == 0 ? (
              <View className="rounded-full bg-[#ddd] h-6 w-6 justify-center">
                <Icon color={theme.colors.ambiental} name="remove" />
              </View>
            ) : (
              <View className="rounded-full bg-costas h-6 w-6 justify-center">
                <Icon color={theme.colors.ambiental} name="remove" />
              </View>
            )}
          </TouchableOpacity>
          <Text>{cantidad}</Text>
          <TouchableOpacity
            onPress={() => {
              addProduct, setCantidad(cantidad + 1);
            }}
          >
            <View className="rounded-full bg-costas h-6 w-6 justify-center">
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
