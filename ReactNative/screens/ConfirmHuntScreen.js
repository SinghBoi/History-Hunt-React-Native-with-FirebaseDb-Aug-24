import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import PinkText from '../components/PinkText';
import MapView, { Marker } from 'react-native-maps';
import Button from '../components/Button';
import { getEstimatedTravelTime, getPlaceName } from '../util/location';

const ConfirmHuntScreen = ({ navigation, route }) => {
  const [destination, setDestination] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const { hunt, location } = route.params;

  // Fetch the destination place name and set the region
  useEffect(() => {
    const fetchDestinationName = async () => {
      try {
        const huntPlaceName = await getPlaceName(hunt.location);
        setDestination(huntPlaceName);
      } catch (error) {
        console.error("Error fetching destination name:", error);
      }
    };

    fetchDestinationName();
  }, [hunt.location]);

  // Set the current location place name
  useEffect(() => {
    const fetchCurrentLocationName = async () => {
      try {
        if (location) {
          const currentPlace = await getPlaceName(location);
          setCurrentLocation(currentPlace);
        }
      } catch (error) {
        console.error("Error fetching current location name:", error);
      }
    };

    fetchCurrentLocationName();
  }, [location]);

  // Fetch the travel time between current location and destination
  useEffect(() => {
    const fetchTime = async () => {
      try {
        if (location && hunt.location) {
          const totalTime = await getEstimatedTravelTime(location, hunt.location);
          setTravelTime(totalTime);
        }
      } catch (error) {
        console.error("Error fetching travel time:", error);
      }
    };

    if (destination) {
      fetchTime();
    }
  }, [location, hunt.location, destination]);

  // Function to extract the first part of the address
  const extractFirstPart = (fullAddress) => {
    return fullAddress ? fullAddress.split(',')[0].trim() : fullAddress;
  };

  const onPressHandler = () => {
    navigation.navigate('CompleteHunt',{ hunt, location })
  };

  return (
    <View style={styles.container}>
      <PinkText style={styles.textColor}>You Picked:</PinkText>
      <Text style={styles.huntText}>{hunt.huntName}</Text>
      <PinkText style={styles.textColor}>Here is the route you will be taking:</PinkText>
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
          title="Destnation"
          pinColor="red"
          />
        </MapView>
      </View>
      <View style={styles.routeContainer}>
        <Text style={styles.routeText}>Start location: {extractFirstPart(currentLocation)}</Text>
        <Text style={styles.routeText}>Destination: {extractFirstPart(destination)}</Text>
        <PinkText style={styles.textColor}>This should take approximately:</PinkText>
        <Text style={styles.totalTime}>{travelTime || "Calculating..."}</Text>
      </View>
      <Button style={styles.button} onPressHandler={onPressHandler}>CONFIRM</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 4,
    paddingBottom: 8,
  },
  huntText: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
  },
  textColor: {
    color: '#A20FDF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  mapContainer: {
    flex: 1,
    marginTop: 4,
  },
  routeContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,        
  }, 
  routeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalTime: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '80%'
  }
});

export default ConfirmHuntScreen;
