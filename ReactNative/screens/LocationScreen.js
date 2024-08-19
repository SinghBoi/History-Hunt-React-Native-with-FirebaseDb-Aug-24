import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LocationPicker from '../components/LocationPicker'
import PinkText from '../components/PinkText'
import { UserContext } from '../store/userContext'
import ImageComp from '../components/ImageComp'
import { HuntContext } from '../store/huntContext'
import * as http from '../util/http'

const LocationScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [userId, setUserId] = useState(null);
  const userContext = useContext(UserContext)
  const huntContext = useContext(HuntContext)
  const { duration, huntName, selectedImageUri, userEmail } = route.params; 
  const { loggedInUser } = useContext(UserContext);
  console.log("userEmail from location", userEmail)


  const onPressHandler = async() => {
    if (location) {
      const newHunt = {
        duration,
        huntName,
        huntImageUri: selectedImageUri,
        invitee: userEmail, 
        location,
        creatorId: loggedInUser.email, 
      };

    const id = await http.createHunt(newHunt)
      huntContext.addHunt({ id, ...newHunt });
      Alert.alert("Hunt created successfully")
      const user = loggedInUser

      navigation.navigate('StartScreen', {user});
    } else {
      Alert.alert('Error', 'Please select a location for the hunt');
    }
  };

  if (loggedInUser) {
    return (
      <View style={styles.container}>
        <LocationPicker location={location} setLocation={setLocation} />
        <View style={styles.imageContainer}>
          <View>
            <ImageComp url={loggedInUser.imageUri} style={styles.image} />
            <PinkText >{loggedInUser.fullName} </PinkText>
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