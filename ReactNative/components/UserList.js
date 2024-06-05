import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { UserContext } from '../store/userContext';
import Icon from './Icon';

const UserList = () => {
    const { users } = useContext(UserContext)
    const data = Object.keys(users).map(key => ({
        id: key,
        ...users[key]
    }));

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Icon icon='user-circle' size={32} color='#4A484A' style={styles.userIcon} name={item.fullName } />
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
    padding: 8,
    marginLeft: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  userIcon: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    width: 70,
    backgroundColor: '#E7E5E7',
    borderColor: 'transparent'
  }
});

export default UserList;
