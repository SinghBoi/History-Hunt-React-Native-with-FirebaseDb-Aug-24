import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import Input from './Input'; 
import Icon from './Icon'; 
import { UserContext } from '../store/userContext'; 

const SearchFriend = ({ selectedUser, setSelectedUser }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { users, loggedInUser } = useContext(UserContext);

  const inputHandler = (text) => {
    setSearchText(text);

    if (text.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredUsers = Object.values(users).filter(user =>
        user.fullName.toLowerCase().startsWith(text.toLowerCase()) && user.email !== loggedInUser.email
      );
      setSuggestions(filteredUsers);
    }
  };

  const onSelectSuggestion = (item) => {
    setSearchText(item.fullName); 
    toggleUserSelection(item); 
    setSuggestions([]); 
  };

  const toggleUserSelection = (item) => {
    const isSelected = selectedUser.some(user => user.id === item.id);

    if (isSelected) {
      setSelectedUser(selectedUser.filter(user => user.id !== item.id));
    } else {
      setSelectedUser([...selectedUser, item]);
    }
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectSuggestion(item)}>
      <Text style={styles.suggestedText}>{item.fullName}</Text>
    </TouchableOpacity>
  );

  const onPressHandler = (item) => {
    toggleUserSelection(item);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedUser.some(user => user.id === item.id);

    return (
      <View style={[styles.userItem, isSelected && styles.selectedItem]}>
        <Icon 
          icon={isSelected ? 'check' : 'user-large'} 
          size={28} 
          color='white' 
          style={styles.userIcon} 
          name={item.fullName} 
          onPressHandler={() => onPressHandler(item)} 
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.serachContainer}>
          <Input
            style={styles.textInput}
            textInputConfig={{
              onChangeText: inputHandler, 
              value: searchText,
              placeholder: "Search",
              autoCapitalize: "none"
            }}
          />
          <Icon icon="magnifying-glass" size={20} color="#B3B1B3" style={styles.icon}/>
        </View>
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            renderItem={renderSuggestionItem} 
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          horizontal={true} 
          data={Object.values(users).filter(user => user.email !== loggedInUser.email)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  serachContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B3B1B3',
    borderRadius: 5,
    paddingHorizontal: 10, 
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    height: 30,
    fontSize: 16,
    color: 'red',
  },
  icon: {
    marginTop: 12,
    marginBottom: 0,
  },
  suggestedText: {
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 8,
    textAlign: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  listContainer: {
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
  selectedItem: {
    backgroundColor: '#4CAF50',
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

export default SearchFriend;
