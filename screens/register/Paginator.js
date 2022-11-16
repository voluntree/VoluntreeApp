import { View, Text, useWindowDimensions, Animated } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const Paginator = ({data, scrollX}) => {
  const {width} = useWindowDimensions()
  return (
    <View style = {{flexDirection : 'row', height:64}} className = "p-2">
      {data.map((_, i) => {
        const inputRange = [(i-1) * width, i * width, (i + 1) * width]
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10,20,10],
          extrapolate: 'clamp'
        })
        return <Animated.View style = {[styles.dot, {width: dotWidth}]} key={i.toString()}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#80a8ff",
    marginHorizontal: 8,
  },
});

export default Paginator