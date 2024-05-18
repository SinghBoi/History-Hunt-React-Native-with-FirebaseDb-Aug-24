import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const Button = ({children}) => {
  return (
    <LinearGradient colors={['#0F37DF', '#A20FDF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </LinearGradient>
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
    fontWeight: '500'
  }
})

export default Button