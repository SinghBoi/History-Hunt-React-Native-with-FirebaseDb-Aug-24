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
  const [inviteeId, setInviteeId] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const userContext = useContext(UserContext);
  const huntContext = useContext(HuntContext);
  const { duration, huntName, selectedImageUri, userEmail } = route.params; 
  const { loggedInUser } = userContext;

  // Fetch user IDs for both the invitee and the logged-in user
  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const fetchedInviteeId = await http.getUserId(userEmail); 
        setInviteeId(fetchedInviteeId);

        const fetchedLoggedInUserId = await http.getUserId(loggedInUser.email); 
        setLoggedInUserId(fetchedLoggedInUserId);
      } catch (error) {
        console.error("Error fetching user IDs:", error);
      }
    };

    fetchUserIds();
  }, [userEmail, loggedInUser.email]);

  const onPressHandler = async () => {
    if (location) {
      const newHunt = {
        duration,
        huntName,
        huntImageUri: selectedImageUri,
        invitee: userEmail, 
        location,
        creatorId: loggedInUser.email, 
      };

      // Create new hunt
      const huntId = await http.createHunt(newHunt);
      huntContext.addHunt({ id: huntId, ...newHunt });
      Alert.alert("Hunt created successfully");

      // Update the invitee's active hunts field
      if (inviteeId) {
        const updatedInvitee = { activeHunts: huntName };
        await http.updateUser(inviteeId, updatedInvitee)
      }
      else {
        console.error("Invitee ID not available to update user");
      }

      // Update the logged-in user's active hunts field
      if (loggedInUserId) {
        const updatedLoggedInUser = { plannedHunts: huntName };
        await http.updateUser(loggedInUserId, updatedLoggedInUser)
      } else {
        console.error("Logged-in user ID not available to update user");
      }

      // Navigate to the StartScreen
      navigation.navigate('StartScreen', { user: loggedInUser });
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
            <PinkText>{loggedInUser.fullName}</PinkText>
          </View>
          <View>
            <TouchableOpacity onPress={onPressHandler}>
              <Image source={require('../assets/historyicon.png')} style={styles.image} />
            </TouchableOpacity>
            <PinkText>History Hunt</PinkText>
          </View>
        </View>
      </View>
    );
  }

  return null; // Render null or a loading indicator if loggedInUser is not available
};

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
});

export default LocationScreen;
