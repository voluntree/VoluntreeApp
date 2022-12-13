import { View, Text, FlatList, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import slides from './slides'
import { Dimensions } from 'react-native'
import Paginator from './Paginator'


const Registro = () => {

  const[currentIndex, setCurrentIndex] = useState(0);

  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get("window").height;
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View className="bg-[#fff]">
      <View className="flex-3 items-center justify-center">
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <View
              style={{
                width: screenWidth,
                height: screenHeight,
              }}
            >
              {item.component}
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator = {false}
          pagingEnabled
          bounces={false}
          onScroll = {Animated.event([{nativeEvent: {contentOffset: {x : scrollX } } }], {
            useNativeDriver: false
          })}
          scrollEventThrottle = {32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig= {viewConfig}
        />
        <Paginator data={slides} scrollX={scrollX} />
      </View>
    </View>
  );
}

export default Registro