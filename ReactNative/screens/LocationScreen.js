import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LocationPicker from '../components/LocationPicker'
import PinkText from '../components/PinkText'
import { UserContext } from '../store/userContext'
import ImageComp from '../components/ImageComp'
import { HuntContext } from '../store/huntContext'
import * as http from '../util/http'
import PlannedHunts from '../components/PlannedHunts'

const LocationScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [inviteeId, setInviteeId] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const userContext = useContext(UserContext);
  const huntContext = useContext(HuntContext);
  const { duration, huntName, selectedImageUri, selectedUser } = route.params; 
  const { loggedInUser } = userContext;

  // Fetch user IDs for both the invitee and the logged-in user
  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const fetchedInviteeId = await http.getUserId(selectedUser.email); 
        setInviteeId(fetchedInviteeId);

        const fetchedLoggedInUserId = await http.getUserId(loggedInUser.email); 
        setLoggedInUserId(fetchedLoggedInUserId);
      } catch (error) {
        console.error("Error fetching user IDs:", error);
      }
    };

    fetchUserIds();
  }, [selectedUser, loggedInUser.email]);

  const onPressHandler = async () => {
      if (!inviteeId || !loggedInUserId) {
          Alert.alert('Error', 'User IDs not properly fetched');
          return;
      }

      if (location) {
          const newHunt = {
              duration,
              huntName,
              huntImageUri: selectedImageUri,
              invitee: selectedUser.email, 
              location,
              createdBy: loggedInUser.email, 
          };

          try {
              const huntId = await http.createHunt(newHunt);
              huntContext.addHunt({ id: huntId, ...newHunt });
              Alert.alert("Hunt created successfully");

              // Update the invitee's active hunts field
              const updatedInvitee = {
                  ...selectedUser, 
                  activeHunts: selectedUser.activeHunts ? [...selectedUser.activeHunts, { huntName }] : [{ huntName }],
              };
              await http.updateUser(inviteeId, updatedInvitee);

              // Update the logged-in user's planned hunts field
              const updatedLoggedInUser = {
                  ...loggedInUser, 
                  PlannedHunts: loggedInUser.PlannedHunts ? [...loggedInUser.PlannedHunts, { huntName }] : [{ huntName }],
              };
              await http.updateUser(loggedInUserId, updatedLoggedInUser);

              // Navigate to the StartScreen
              navigation.navigate('StartScreen', { user: loggedInUser });
          } catch (error) {
              console.error("Error during hunt creation:", error);
              Alert.alert('Error', 'Failed to create and update hunt information');
          }
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
