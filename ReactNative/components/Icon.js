import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome6';

const Icon = ({icon, size, color, onPressHandler, name, style}) => {
  return (
    <Pressable  onPress={onPressHandler}>
      <View style={style}>        
        <FontAwesome name={icon} size={size} color={color} />
        <Text style={styles.text}>{name}</Text>
        </View>      
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: '#4A484A',
    fontFamily: 'sans-serif-light'
  }
})

export default Icon