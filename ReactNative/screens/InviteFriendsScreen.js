import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import SearchFriend from '../components/SearchFriend'
import Button from '../components/Button'

const InviteFriendsScreen = ({ navigation, route }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { duration, huntName, selectedImageUri } = route.params; 

  const onPressHandler = async () => {
    if (selectedUser) {
      const userEmail = selectedUser.email;
      console.log("user email from invit screen", userEmail)
      navigation.navigate('location', { duration, huntName, selectedImageUri, userEmail });
    } else {
      Alert.alert('Error', 'Please select a friend to invite for the hunt');
    }
  }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Invite Friends</Text>
        <SearchFriend selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
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