import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import SearchFriend from '../components/SearchFriend'
import Button from '../components/Button'

const InviteFriendsScreen = ({ navigation, huntId }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const onPressHandler = async () => {
    const userEmail = selectedUser.email;
    navigation.navigate('location', { userEmail });    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Invite Friends</Text>
      <SearchFriend selectedUser={selectedUser}  setSelectedUser={setSelectedUser} />
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