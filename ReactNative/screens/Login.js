import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import Title from '../components/Title'
import Button from '../components/Button'

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    onPressHandler = () => {
        if (email && password) {
            Alert.alert('Login successfull');
            navigation.navigate('StartScreen');
        } else {
            Alert.alert('Error', 'Please fill all the details');
        }
    }
    
    return (
    <View style={styles.mainContainer}>
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Title> History Hunt </Title>
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.loginText}> Log In </Text>
                    <TextInput placeholder='Email' style={styles.textInput} value={email} onChangeText={setEmail} />
                    <TextInput placeholder='Password' style={styles.textInput} 
                        value={password} onChangeText={setPassword}secureTextEntry />
                    <Button onPressHandler={onPressHandler}> CONTINUE </Button>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.text}> Need to make an account? </Text>
                    <Text style={styles.signUpText} onPress={()=> navigation.navigate('SignUp')}> Sign up here </Text>
                </View>
            </View>   
        </View>
    </View>
)}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        margin: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 34,
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 40,
        marginBottom: 10,
    },
    loginContainer: {
        flex: 4,
        marginTop: 26,
        alignContent: 'center',
    },
    textInput: {
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        borderRadius: 6,
    },
    formContainer: {
        alignContent: 'center',
    },
    text: {
        marginTop: 16,
        textAlign: 'center',
        color: '#514F51',
        fontWeight: '600',
    },
    signUpText: {
        textAlign: 'center',
        color: '#0F37DF',
        fontWeight: '900',
    },
})

export default Login
