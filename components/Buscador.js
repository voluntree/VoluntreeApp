import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { theme } from '../tailwind.config'

const Buscador = () => {
  return (
    <View className = "flex-row justify-between">
        <View className="justify-between flex-row bg-[#d3d3d3] w-80 h-10 ml-2 rounded-full mt-3">
            <Text className="text-[#949494] pl-4 pt-1.5">Buscar...</Text>
            <Icon
                className="pr-3 pt-1.5"
                name="search"
                type="octicon"
                color={theme.colors.bottomTabs}
                size={24}
            />
        </View>
        <Icon className = "pt-5 pr-3"
            name="filter"
            type="octicon"
            color={theme.colors.bottomTabs}
            size={24}
        />   
    </View>
  );
}

export default Buscador