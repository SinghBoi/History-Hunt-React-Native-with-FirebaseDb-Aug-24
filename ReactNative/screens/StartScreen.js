import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import User from '../components/User'
import ActiveHunts from '../components/ActiveHunts'
import PlannedHunts from '../components/PlannedHunts'
import Medals from '../components/Medals'

const StartScreen = ({navigation}) => {
  return (
    <View>
      <User />
      <ActiveHunts />
      <PlannedHunts />
      <Text style={styles.createHuntText} onPress={()=> navigation.navigate('createHunt')}> Create a Hunt</Text>
      <Medals />
    </View>
  )
}

const styles = StyleSheet.create({
  createHuntText: {
    color: 'orange',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default StartScreen
