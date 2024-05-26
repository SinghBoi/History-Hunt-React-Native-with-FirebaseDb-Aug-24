import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import * as Crypto from 'expo-crypto';
import Input from './Input';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../store/userContext';

const SignUpForm = () => {
    const [inputValue, setInputValue] = useState({ email: "", fullName: "", password: "" });

    const userContext = useContext(UserContext);
    const navigation = useNavigation();

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

    const onPressHandler = async () => {
        if (inputValue.email !== "" && inputValue.fullName !== "" && inputValue.password !== "") {
            const password = await encryptPassword(inputValue.password);
            if (password) {
                const user = {
                    email: inputValue.email,
                    fullName: inputValue.fullName,
                    password: password,
                };
                userContext.addUser(user);
                Alert.alert('Success', 'User created successfully');
                navigation.navigate('LoginScreen');
            } else {
                Alert.alert('Error', 'Password encryption failed');
            }
        } else {
            Alert.alert('Error', 'Please fill all the details');
        }
    };

    return (
        <View>
            <Text style={styles.profileText}> Sign Up </Text>
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
                }}
            />
            <Input
                style={styles.textInput}
                textInputConfig={{
                    secureTextEntry: true,
                    onChangeText: inputHandler.bind(this, "password"),
                    placeholder: "Password",
                }}
            />
            <Button onPressHandler={onPressHandler}> SIGN UP </Button>
        </View>
    );
};

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
});

export default SignUpForm;
