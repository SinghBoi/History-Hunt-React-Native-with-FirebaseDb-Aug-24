import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Icon = ({icon, size, color, onPressHandler}) => {
  return (
    <Pressable  onPress={onPressHandler}>
        <View>
            <MaterialIcons name={icon} size={size} color={color} />
        </View>      
    </Pressable>
  )
}

export default Icon