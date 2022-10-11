import { View, Text } from 'react-native'

import React from 'react'
import { Icon, SearchBar } from 'react-native-elements'
import { theme } from '../tailwind.config'

const Buscador = () => {
  return (
    <View className = "flex-row justify-center items-center">
        <SearchBar/>
        
        <Icon className = "pt-5 px-1"
            name="filter"
            type="octicon"
            color={theme.colors.bottomTabs}
            size={24}
        />   
    </View>
  );
}

export default Buscador