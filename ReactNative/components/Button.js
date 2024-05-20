import { Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const Button = ({children, onPressHandler}) => {
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <LinearGradient colors={['#0F37DF', '#A20FDF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={styles.button}>
      <Text style={styles.text}> {children} </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    borderRadius: 60,
  },
  text: {
    padding: 8,
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF', 
    fontWeight: '900'
  }
})

export default Button