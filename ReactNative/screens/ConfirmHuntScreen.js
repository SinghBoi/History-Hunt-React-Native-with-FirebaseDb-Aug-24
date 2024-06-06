import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import PinkText from '../components/PinkText'
import MapView, { Marker } from 'react-native-maps'
import Button from '../components/Button'

const ConfirmHuntScreen = ({ hunt }) => {
    const [pickedLocation, setPickedLocation] = useState(null)   

    const initialRegion = {
        latitude: 57.70887,
        longitude: 11.97456,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
     }

    const locateUser = (event) => {
      
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log(latitude, longitude)
    setPickedLocation({latitude, longitude})
    }
    
    const onPressHandler = () => {
     console.log('navigate to clue screen')
    }
  return (
    <View style={styles.container}>
          <PinkText> You Picked: </PinkText>
          <Text style={styles.huntText}>Hunt name here</Text>
          <PinkText> Here is the route you will be taking:</PinkText>
          {/* Here we need route from hun.location to current location */}
           <MapView
              style={styles.mapContainer}
              initialRegion={initialRegion}
              onPress={locateUser}
            >
              {pickedLocation && (
                <Marker
                  style={styles.map}
                  coordinate={pickedLocation}
                  title="Your picked location"
                />
              )}
          </MapView>
          <View style={styles.routeContainer}>
              <Text style={styles.routeText}>Start location</Text>
              <Text style={styles.routeText}>Destination</Text>
              <PinkText> This should take approximately:</PinkText>
              <Text style={styles.totalTime}>Here route time</Text>
          </View>
          <Button style={styles.button} onPressHandler={onPressHandler}>CONFIRM</Button>
    </View>
  )
}

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
})

export default ConfirmHuntScreen