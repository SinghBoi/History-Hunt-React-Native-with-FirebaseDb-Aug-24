import { View, Text, StyleSheet,Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'

const SignUpForm = () => {
    const [inputValue, setInputValue] = useState({ email: "", fullName: "", password: "" })
    
    const navigation = useNavigation()

    const inputHandler = (valueInputProperty, text) => {
        setInputValue({
            [valueInputProperty]: text,
    })
    };

    onPressHandler = () => {
        if (inputValue.email !== "" && inputValue.fullName  !== "" && inputValue.password !== "") {
            console.log(inputValue)
            Alert.alert('User created successfully');
            navigation.navigate('Login');
        } else {
      Alert.alert('Error', 'Please fill all the details');
        }
    }

  return (
    <View>
          <Text style={styles.profileText}> Profile </Text>
          <Input style={styles.textInput} textInputConfig={{ onChangeText:  inputHandler.bind(this, "email") , placeholder: "Email", }} />
          <Input style={styles.textInput} textInputConfig={{  onChangeText: inputHandler.bind(this, "fullName"), placeholder: "Name", }} />
          <Input style={styles.textInput} textInputConfig={{ onChangeText: inputHandler.bind(this, "password"), placeholder: "Password", }} />
          <Button onPressHandler={onPressHandler}> SIGN UP </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    profileText: {
        fontSize: 34,
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 40,
        marginBottom: 10,
    },
    textInput: {
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        borderRadius: 6,
        width: 200,
    },
})
export default SignUpForm