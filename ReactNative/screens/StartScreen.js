import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import User from '../components/User'
import ActiveHunts from '../components/ActiveHunts'
import PlannedHunts from '../components/PlannedHunts'
import Medals from '../components/Medals'

const StartScreen = ({ route, navigation }) => {
  const { user } = route.params;
  return (
    <ScrollView style={styles.container}>
      <User user={user} />
      <ActiveHunts />
      <PlannedHunts />
      <Text style={styles.createHuntText} onPress={()=> navigation.navigate('createHunt')}> Create a Hunt</Text>
      <Medals />
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 30,
    },
  createHuntText: {
    color: 'orange',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default StartScreen
