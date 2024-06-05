import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as Crypto from 'expo-crypto'
import Input from './Input'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../store/userContext'
import { getUser } from '../util/http'

const SignUpForm = () => {
  const [inputValue, setInputValue] = useState({ email: "", fullName: "", password: "" });
  const userContext = useContext(UserContext);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDB = await getUser(inputValue.email);
        setUser(userDB);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (inputValue.email) {
      fetchUser();
    }
  }, [inputValue.email]);

  const inputHandler = (valueInputProperty, text) => {
    setInputValue((prev) => ({
      ...prev,
      [valueInputProperty]: text,
    }));
  };

  const encryptPassword = async (password) => {
    try {
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
      return hashedPassword;
    } catch (error) {
      console.error('Error encrypting password:', error);
      return null;
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleExistingUser = () => {
    Alert.alert('User already exists', 'Please log in instead.');
  };

  const handleNewUser = async () => {
    const isValidMail = isValidEmail(inputValue.email);
    if (!isValidMail) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!isValidInput()) {
      Alert.alert('Incomplete Details', 'Please fill all the details.');
      return;
    }

    const password = await encryptPassword(inputValue.password);

    const newUser = {
      email: inputValue.email,
      fullName: inputValue.fullName,
      password: password,
    };

    userContext.addUser(newUser);
    Alert.alert('Success', 'User created successfully');
    navigation.navigate('LoginScreen');
  };

  const isValidInput = () => {
    return inputValue.email !== "" && inputValue.fullName !== "" && inputValue.password !== "";
  };

  const onPressHandler = async () => {
    if (user) {
      handleExistingUser();
    } else {
      handleNewUser();
    }
  };

  return (
    <View>
      <Text style={styles.profileText}>Sign Up</Text>
      <Input
        style={styles.textInput}
        textInputConfig={{
          keyboardType: "email-address",
          autoCapitalize: "none",
          autoCorrect: false,
          onChangeText: inputHandler.bind(this, "email"),
          placeholder: "Email",
        }}
      />
      <Input
        style={styles.textInput}
        textInputConfig={{
          onChangeText: inputHandler.bind(this, "fullName"),
          placeholder: "Name",
          autoCorrect: false,
          autoCapitalize: "none",
        }}
      />
      <Input
        style={styles.textInput}
        textInputConfig={{
          secureTextEntry: true,
          autoCorrect: false,
          autoCapitalize: "none",
          onChangeText: inputHandler.bind(this, "password"),
          placeholder: "Password",
        }}
      />
      <Button onPressHandler={onPressHandler}>SIGN UP</Button>
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

export default SignUpForm;
