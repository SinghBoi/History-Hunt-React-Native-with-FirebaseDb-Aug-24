import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import PinkText from './PinkText';
import Hunt from './Hunt';

const PlannedHunts = ({ user }) => {
  const plannedHunts = user.PlannedHunts;

  const onPressHandler = () => {
    console.log("you clicked planned hut")
  }
  if (plannedHunts) {
    return (
      <View style={styles.container}>
        <PinkText style={styles.text}>Planned Hunts</PinkText>
          <FlatList
            data={plannedHunts}
            keyExtractor={(item, index) => `${ item.huntName }-${ index }`}
            renderItem={({ item }) => <Hunt huntName={item.huntName} onPressHandler={onPressHandler} />}
          />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  text: {
    color: '#A20FDF',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left'
  },
  noHuntsText: {
    color: '#A20FDF',
    fontWeight: 'bold',
  },
});

export default PlannedHunts;
