import { View, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import PinkText from './PinkText'
import Hunt from './Hunt'

const ActiveHunts = ({ user, onPressHandler }) => {
  const [hunt, setHunt] = useState(null)

  const activeHunts = user.activeHunts;
  console.log(activeHunts)

  if (activeHunts) {
    return (
      <View style={styles.container}>
        <PinkText style={styles.text}>Active Hunts</PinkText>
          <FlatList
            data={activeHunts}
            keyExtractor={(item, index) => `${ item.huntName }-${ index }`}
            renderItem={({ item }) => <Hunt hunt={hunt} setHunt={setHunt} huntName={item.huntName} onPressHandler={() => onPressHandler(hunt)} />}
          />
      </View>
    );
  };
}

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
})

export default ActiveHunts