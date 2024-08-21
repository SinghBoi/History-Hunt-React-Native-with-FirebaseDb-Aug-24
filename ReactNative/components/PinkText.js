import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const PinkText = ({children, style}) => {
  return (
    <View>
      <Text style={style}>{children}</Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
  textColor: {
    color: '#A20FDF',
    fontWeight: 'bold',
  }
})

export default PinkText