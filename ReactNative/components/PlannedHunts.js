import { View, StyleSheet } from 'react-native'
import React from 'react'
import PinkText from './PinkText'
import Hunt from './Hunt'

const PlannedHunts = ({user}) => {
  return (
    <View style={styles.container}>
      <PinkText style={styles.text}> Planned Hunts </PinkText>
      <Hunt hunt="here is first hunts name" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },  
  text: {
    color: '#A20FDF',
    fontWeight: 'bold',
    marginBottom: 10,
  }
})

export default PlannedHunts