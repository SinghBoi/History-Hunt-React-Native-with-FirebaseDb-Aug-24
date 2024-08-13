import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SearchFriend from '../components/SearchFriend'
import Button from '../components/Button'
import UserList from '../components/UserList'

const InviteFriendsScreen = ({navigation}) => {
    const onPressHandler = () => {
        navigation.navigate('location')
    }
  return (
    <View style={styles.container}>
          <Text style={styles.text}>Invite Friends</Text>
          <SearchFriend />
          <UserList />
          <Button onPressHandler={onPressHandler}>INVITE</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  text: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '700'
  }
})



export default InviteFriendsScreen