import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LocationPicker from '../components/LocationPicker'

const LocationScreen = () => {  

  return (
      <View style={styles.container}>
        <LocationPicker />        
        <Text>LocationScreen</Text>
          <Text>UserIcon</Text>  
          <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 8,
    },
})

export default LocationScreen