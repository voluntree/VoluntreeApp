import { View, Text, TextInput, TouchableOpacity } from "react-native";

import React from "react";
import { Icon } from "react-native-elements";
import { theme } from "../tailwind.config";

const Buscador = () => {
  return (
    <View className="flex-row items-center my-3 space-x-3">
      <View className="flex-row items-center w-fit rounded-full bg-[#d6d5d5] justify-between">
        <TextInput
          className="bg-[#d6d5d5] rounded-full w-3/4 h-8 px-5"
          placeholder="Buscar..."
        />
        <TouchableOpacity>
          <Icon
            className="pr-2 z-10"
            name="search"
            type="octicon"
            color={theme.colors.bottomTabs}
            size={24}
          />
        </TouchableOpacity>
      </View>

      <Icon
        name="filter"
        type="octicon"
        color={theme.colors.bottomTabs}
        size={24}
      />
    </View>
  );
};

export default Buscador;
