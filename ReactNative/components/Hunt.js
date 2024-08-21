import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ImageComp from './ImageComp'
import { getHunt } from '../util/http';

const Hunt = ({hunt, setHunt, huntName, onPressHandler }) => {

  useEffect(() => {
    const fetchHunt = async () => {
      try {
        const huntdb = await getHunt(huntName);
        setHunt(huntdb);
      } catch (error) {
        console.error("Error fetching hunt:", error);
      }
    };
    fetchHunt();
  }, [huntName]);

  
  
  if (hunt) {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <ImageComp url={hunt.huntImageUri} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.heading} onPress={onPressHandler}> {huntName} </Text>
          <Text> Objective </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom:10,
  },
  heading: {
    fontWeight: "900",
  },
  imgContainer: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#A20FDF',
  },
  infoContainer: {
    flex: 4,
  }
})

export default Hunt