import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LocationPicker from '../components/LocationPicker'
import PinkText from '../components/PinkText'
import { UserContext } from '../store/userContext'
import ImageComp from '../components/ImageComp'

const LocationScreen = ({ navigation, route, hunt }) => {
  const [pickedLocation, setPickedLocation] = useState(null)
  const [user, setUser] = useState(null)
  const userContext = useContext(UserContext)
  const { userEmail } = route.params;

  console.log("userEmail from location", userEmail)
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDB = await userContext.findUser(userEmail);
        console.log("userDB", userDB)
        setUser(userDB)
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);
  

  const onPressHandler = () => {
    console.log("You clicked create hunt")
  }
  if (user) {
    return (
      <View style={styles.container}>
        <LocationPicker pickedLocation={pickedLocation} setPickedLocation={setPickedLocation} />
        <View style={styles.imageContainer}>
          <View>
            <ImageComp url={user.imageUri} style={styles.image} />
            <PinkText >{user.fullName} </PinkText>
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