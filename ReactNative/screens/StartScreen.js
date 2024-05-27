import { View, Text } from 'react-native'
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
      <Text> Create a Hunt</Text>
      <Medals />
    </View>
  )
}

export default StartScreen
