import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import * as Crypto from 'expo-crypto';
import Input from './Input';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../store/userContext';

const LoginForm = () => {
    const [inputValue, setInputValue] = useState({ email: "", password: "" });

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
        if (inputValue.email !== "" && inputValue.password !== "") {
            const user = userContext.findUser(inputValue.email);
            if (user) {
                const encryptedPassword = await encryptPassword(inputValue.password);
                if (encryptedPassword && encryptedPassword === user.password) {
                    Alert.alert('Success', 'User Logged In successfully');
                    navigation.navigate('StartScreen');
                } else {
                    Alert.alert('Error', 'Incorrect password');
                }
            } else {
                Alert.alert('Error', 'User not found');
            }
        } else {
            Alert.alert('Error', 'Please fill all the details');
        }
    };

    return (
        <View>
            <Text style={styles.loginText}> Log In </Text>
            <Input 
                style={styles.textInput} 
                textInputConfig={{ 
                    keyboardType: "email-address", 
                    autoCapitalize:"none", 
                    autoCorrect: false, 
                    onChangeText: inputHandler.bind(this, "email"), 
                    placeholder: "Email", 
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
            <Button onPressHandler={onPressHandler}> Login </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    loginText: {
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

export default LoginForm;
