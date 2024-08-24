import { View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import PinkText from './PinkText';
import Hunt from './Hunt';
import * as Location from 'expo-location';

const ActiveHunts = ({ user, navigation }) => {
  const [hunt, setHunt] = useState(null)
  const [location, setLocation] = useState(null);  

  console.log(hunt)

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      const currentLoc = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(currentLoc);      
    })();
  }, []);

  const activeHunts = user.activeHunts;

    // Filter active hunts to exclude completed hunts
  const filteredHunts = activeHunts?.filter(hunt => !hunt.completed) || [];

  const onActiveHuntPress = (hunt) => {
    if (location) {
      navigation.navigate("ConfirmHunt", { hunt, location });
    } else {
      console.log('Location is still loading...');
    }
  };

  if (filteredHunts.length > 0) {
    return (
      <View style={styles.container}>
        <PinkText style={styles.text}>Active Hunts</PinkText>
        <FlatList
          data={filteredHunts}
          keyExtractor={(item, index) => `${item.huntName}-${index}`}
          renderItem={({ item }) => (
            <Hunt
              hunt={hunt}
              setHunt={setHunt}
              huntName={item.huntName}
              onPressHandler={() => onActiveHuntPress(hunt)}
            />
          )}
        />
      </View>
    );
  }
    return null;
};


const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  text: {
    color: '#A20FDF',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  }
});

export default ActiveHunts;
