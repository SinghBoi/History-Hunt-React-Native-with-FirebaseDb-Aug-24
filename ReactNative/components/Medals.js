import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Medals = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.line} />
        <Text style={styles.text}>MEDALS</Text>
        <View style={styles.line} />
      </View>
      
      <View style={styles.medalContainer}>
        <View style={styles.row}>
          <View style={styles.medal} />
          <View style={styles.medal} />
          <View style={styles.medal} />
          <View style={styles.medal} />
          <View style={styles.medal} />
        </View>
        <View style={styles.row}>
          <View style={styles.medal} />
          <View style={styles.medal} />
          <View style={styles.medal} />
          <View style={styles.medal} />
          <View style={styles.medal} />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%', 
  },
  medal: {
    height: 60,
    width: 60,
    backgroundColor: 'gray',
    borderRadius: 30, 
  },
});

export default Medals;