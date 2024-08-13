import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'


const LocationPicker = ({navigation}) => {
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
        setPickedLocation({ latitude, longitude })
        navigation.navigate('StartScreen', pickedLocation)
    }
  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 8,
    },
    mapContainer: {
        flex: 1,
        marginTop: 4,
    },
})

export default LocationPicker