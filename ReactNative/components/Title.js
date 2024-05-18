import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const Title = ({ children }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/historyicon.png')} style={styles.image} />
      <Text style={styles.text}>{children }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 75,
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    color: '#DF0FDE',
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#A20FDF',
    borderRadius: 10,
  },
});

export default Title