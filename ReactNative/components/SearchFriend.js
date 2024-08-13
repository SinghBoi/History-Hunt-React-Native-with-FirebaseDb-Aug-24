import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import Input from './Input';
import Icon from './Icon';
import { UserContext } from '../store/userContext';

const SearchFriend = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { users } = useContext(UserContext);

  const inputHandler = (text) => {
    setSearchText(text);
    
    // clear the suggestions if text is erased
    if (text.trim() === "") {
      setSuggestions([]);
    } else {
      // Filter the entered text from users db
      const filteredUsers = Object.values(users).filter(user =>
        user.fullName.toLowerCase().startsWith(text.toLowerCase())
      );
      setSuggestions(filteredUsers);
    }
  };

  const onPressHandler = () => {
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectSuggestion(item)}>
      <Text style={styles.suggestedText}>{item.fullName}</Text>
    </TouchableOpacity>
  );

  const onSelectSuggestion = (user) => {
    setSearchText(user.fullName);
    setSuggestions([]); 
  };

  return (
    <View>
      <View style={styles.container}>
        <Input
          style={styles.textInput}
          textInputConfig={{
            onChangeText: inputHandler,
            value: searchText,
            placeholder: "Search",
            autoCapitalize: "none"
          }}
        />
        <Icon icon="magnifying-glass" size={20} color="#B3B1B3" onPressHandler={onPressHandler} style={styles.icon}/>
      </View>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={renderSuggestionItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B3B1B3',
    borderRadius: 5,
    paddingHorizontal: 10, 
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
  }
});

export default SearchFriend;
