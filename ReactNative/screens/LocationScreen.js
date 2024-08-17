import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LocationPicker from '../components/LocationPicker'
import PinkText from '../components/PinkText'

const LocationScreen = ({ navigation, updatedUser, hunt }) => {  
  const [pickedLocation, setPickedLocation] = useState(null)   

  const onPressHandler = () => {
    console.log("You clicked create hunt")
  }

  return (
      <View style={styles.container}>
        <LocationPicker pickedLocation={pickedLocation} setPickedLocation={setPickedLocation} />     
      <View style={styles.imageContainer}>
        <View>
          <Image source={require('../assets/i.jpg')} style={styles.image} />
          <PinkText >Username </PinkText>
        </View>
        <View>
        <TouchableOpacity onPress={onPressHandler}>
          <Image source={require('../assets/historyicon.png')} style={styles.image} />
          </TouchableOpacity>
          <PinkText > History Hunt </PinkText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    width: 70,
    height: 70,
    backgroundColor: '#223d81',
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#A20FDF',
  }, 
    textColor: {
    color: '#A20FDF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default LocationScreen