import { View, StyleSheet } from 'react-native'
import React from 'react'
import PinkText from './PinkText'
import Hunt from './Hunt'

const ActiveHunts = () => {
  return (
    <View style={styles.container}>
      <PinkText style={styles.text}> Active Hunts </PinkText>
      <Hunt hunt="here is first hunts name" />
      <Hunt hunt= "here is second hunts name" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },  
  text: {
    color: '#A20FDF',
    fontWeight: 'bold',
    marginBottom: 10,
  }
})

export default ActiveHunts