import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const Title = ({children}) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F37DF', '#A20FDF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={styles.button}>
        <Image source={require('../assets/historyicon.png')} style={styles.image} />
      </LinearGradient>

      <Text style={styles.text}> {children} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 36,
    alignItems: 'center',
    justifyContent: 'center',    
  },
  image: {
    width: 70,
    height: 70,
    color: '#DF0FDE',
    textAlign: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#A20FDF',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Title
