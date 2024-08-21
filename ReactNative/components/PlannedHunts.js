import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import PinkText from './PinkText';
import Hunt from './Hunt';

const PlannedHunts = ({ user, onPressHandler }) => {
  const [hunt, setHunt] = useState(null)

  const plannedHunts = user.PlannedHunts;

  if (plannedHunts) {
    return (
      <View style={styles.container}>
        <PinkText style={styles.text}>Planned Hunts</PinkText>
          <FlatList
            data={plannedHunts}
            keyExtractor={(item, index) => `${ item.huntName }-${ index }`}
            renderItem={({ item }) => <Hunt hunt={hunt} setHunt={setHunt} huntName={item.huntName} onPressHandler={() => onPressHandler(hunt)} />}
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
