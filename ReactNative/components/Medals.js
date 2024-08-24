import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); 
const medalSize = width * 0.15; 

const Medals = ({ user }) => {
  // Calculate the number of completed hunts
  const completedHuntsCount = user.activeHunts?.filter(hunt => hunt.completed)?.length || 0;
  const medalsArray = Array.from({ length: completedHuntsCount }, (_, index) => index);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.line} />
        <Text style={styles.text}>MEDALS</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.medalContainer}>
        {/* Render medals */}
        {medalsArray.map((_, index) => (
          <View key={index} style={styles.medal} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', 
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: 'gray',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  medalContainer: {
    marginTop: 20, 
    paddingHorizontal: 10,
    width: '100%', 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medal: {
    height: medalSize,
    width: medalSize,
    backgroundColor: 'green',
    borderRadius: medalSize / 2, 
    margin: 5,
  },
});

export default Medals;
