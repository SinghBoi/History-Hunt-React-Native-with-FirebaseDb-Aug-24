import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import PinkText from '../components/PinkText';
import { UserContext } from '../store/userContext';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import * as http from '../util/http';

const CompleteHuntScreen = ({ navigation, route }) => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const userContext = useContext(UserContext);
  const { hunt, location } = route.params; 
  const { loggedInUser } = userContext;

  useEffect(() => {
    const fetchLoggedInUserId = async () => {
      try {
        const fetchedLoggedInUserId = await http.getUserId(loggedInUser.email); 
        setLoggedInUserId(fetchedLoggedInUserId);
      } catch (error) {
        console.error("Error fetching logged-in user ID:", error);
      }
    };

    fetchLoggedInUserId();
  }, [loggedInUser.email]);

  const handleCompleteHunt = async () => {
    try {
      // Update the loggedInUser's active hunts 
      const updatedLoggedInUser = {
        ...loggedInUser, 
        activeHunts: loggedInUser.activeHunts.map(hnt => 
          hnt.huntName === hunt.huntName 
            ? { ...hnt, completed: true } 
            : hnt 
        )
      };

      userContext.updateUser(loggedInUserId, updatedLoggedInUser);
      await http.updateUser(loggedInUserId, updatedLoggedInUser);

      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access the camera was denied.');
        return;
      }

      // Launch the camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('Captured Image URI:', imageUri);
      } else {
        console.log('Image capture canceled');
      }

      // Navigate to the StartScreen
      navigation.navigate('StartScreen', { user: updatedLoggedInUser });
    } catch (error) {
      console.error('Error completing hunt or capturing image:', error);
    }
  };

  if (loggedInUser) {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView 
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: (location.latitude + hunt.location.latitude) / 2, // Center between the two points
              longitude: (location.longitude + hunt.location.longitude) / 2,
              latitudeDelta: Math.abs(location.latitude - hunt.location.latitude) * 1.5, // Adjust zoom level
              longitudeDelta: Math.abs(location.longitude - hunt.location.longitude) * 1.5,
            }}
            showsUserLocation={true}
            zoomEnabled={false}
            scrollEnabled={false} 
          >
            <Marker
              coordinate={location}
              pinColor="blue"
            />
            <Marker
              coordinate={hunt.location}
              title="Destination"
              pinColor="red"
            />
          </MapView>
        </View>
        <View style={styles.imageContainer}>
          <View>
            <PinkText>{loggedInUser.fullName}</PinkText>
          </View>
          <View>
            <TouchableOpacity onPress={handleCompleteHunt}>
              <MaterialIcons style={styles.iconButton} name="camera" size={75} color="black" />
            </TouchableOpacity>
            <PinkText>History Hunt</PinkText>
          </View>
        </View>
      </View>
    );
  }

  return null; 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
    marginTop: 4,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconButton: {
    alignItems: 'flex-start',
  },
});

export default CompleteHuntScreen;
