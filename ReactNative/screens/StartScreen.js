import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import User from '../components/User';
import ActiveHunts from '../components/ActiveHunts';
import PlannedHunts from '../components/PlannedHunts';
import Medals from '../components/Medals';

const StartScreen = ({ route, navigation }) => {
  const { user } = route.params;

    // Handler for planned hunts
  const onPlannedHuntPress = (hunt) => {
    console.log("Planned Hunt clicked");
  };

  const data = [
    { key: 'user', component: <User user={user} /> },
    { key: 'activeHunts', component: <ActiveHunts user={user} navigation={navigation}/> },
    { key: 'plannedHunts', component: <PlannedHunts user={user} onPressHandler={onPlannedHuntPress}/> },
    {
      key: 'createHunt',
      component: (
        <Text
          style={styles.createHuntText}
          onPress={() => navigation.navigate('createHunt')}
        >
          Create a Hunt
        </Text>
      ),
    },
    { key: 'medals', component: <Medals user={user} /> },
  ];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <View>{item.component}</View>}
      keyExtractor={(item) => item.key}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 30,
  },
  createHuntText: {
    color: 'orange',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StartScreen;
