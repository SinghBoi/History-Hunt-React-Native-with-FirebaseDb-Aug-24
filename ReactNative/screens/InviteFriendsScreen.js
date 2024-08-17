import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import SearchFriend from '../components/SearchFriend'
import Button from '../components/Button'
import UserList from '../components/UserList'
import { UserContext } from '../store/userContext'

const InviteFriendsScreen = ({ navigation, huntId }) => {
  const onPressHandler = async() => {
    // Need to fix it with the final hunt creation
      // Update the user's imageUri field
            const updatedUser = { ...user, plannedHunt:  huntId};
            console.log("updated user------------------", updatedUser)
          //  await updateUser(userId, updatedUser) ///this one need to move in navigation screen
      navigation.navigate('location', updatedUser)
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