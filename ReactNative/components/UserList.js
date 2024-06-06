import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { UserContext } from '../store/userContext';
import Icon from './Icon';

const UserList = () => {
    const [selectedUser, setSelectedUser] = useState(null);
  const { users } = useContext(UserContext)
  
    const data = Object.keys(users).map(key => ({
        id: key,
        ...users[key]
    }));
  
  const onPressHandler = (item) => {
    setSelectedUser(item)
  }

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Icon icon={selectedUser && selectedUser.id === item.id ? 'check' : 'user-large'} size={28} color='white' style={styles.userIcon} name={item.fullName} onPressHandler={() => onPressHandler(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true} 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  flatListContainer: {
    justifyContent: 'center',
  },
  userItem: {
    padding: 14,
    marginLeft: 8,
    backgroundColor: '#E2E2E2',
    borderRadius: 16,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  userIcon: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 20, 
    width: 70,
    backgroundColor: '#808080',
    borderColor: 'transparent',    
    textAlign: 'center',
    alignSelf: 'flex-start',
  }
});

export default UserList;
