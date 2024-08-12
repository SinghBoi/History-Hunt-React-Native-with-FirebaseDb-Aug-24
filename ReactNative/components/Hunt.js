import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ImageComp from './ImageComp'

const Hunt = ({ hunt }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <ImageComp url='https://th.bing.com/th/id/R.4a72946f6be200c3760cf30828dce68f?rik=0l6w%2bkcikN%2bNCg&pid=ImgRaw&r=0' style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.heading} onPress={()=> navigation.navigate('ConfirmHunt')}> {hunt} </Text>
        <Text> Objective </Text>
      </View>      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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