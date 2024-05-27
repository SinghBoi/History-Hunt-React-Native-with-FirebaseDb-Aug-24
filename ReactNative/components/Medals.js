import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Medals = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>-----------MEDALS----------</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#125eda'
  }
})

export default Medals