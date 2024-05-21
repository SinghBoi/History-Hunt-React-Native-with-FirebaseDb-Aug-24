import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import Title from '../components/Title'
import Button from '../components/Button'

const SignUp = ({ navigation }) => {
  
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    onPressHandler = () => {
        if (email && name && password) {
            Alert.alert('User created successfully');
            navigation.navigate('Login');
        } else {
      Alert.alert('Error', 'Please fill all the details');
        }
    }

    return (
    <View style={styles.mainContainer}>
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                {/* <Text style={styles.backArrow} onPress={()=> navigation.navigate('Login')} > ← </Text> */}
                <Title> History Hunt </Title>
            </View>
            <View style={styles.signUpContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.profileText}> Profile </Text>
                    <TextInput placeholder='Email' style={styles.textInput} value={email} onChangeText={setEmail} />
                    <TextInput placeholder='Name' style={styles.textInput} value={name} onChangeText={setName} />
                    <TextInput  placeholder='Password' style={styles.textInput} 
                        value={password} onChangeText={setPassword}secureTextEntry />
                    <Button onPressHandler={onPressHandler}> SIGN UP </Button>
                </View>                    
                <View style={styles.formContainer}>
                    <Text style={styles.termCondition}> By signing up I accept the
                    <Text style={styles.underlineText}> term of use </Text> and the
                    <Text style={styles.underlineText}> data privacy policy. </Text></Text>
                    <Text style={styles.text}> Already have an account? </Text>
                    <Text style={styles.loginText} onPress={()=> navigation.navigate('Login')}> Log in here </Text>
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
    backArrow: {
        textAlign: 'left',
        fontWeight: '900',
        color: '#0F37DF',
        fontSize: 40,
    },
    profileText: {
        fontSize: 34,
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 40,
        marginBottom: 10,
    },
    signUpContainer: {
        flex: 4,
        marginTop: 26,
        alignItems: 'center',
    },
    textInput: {
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        borderRadius: 6,
        width: 200,
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
    termCondition: {
        marginTop: 16,
        textAlign: 'center',
        fontWeight: '600',
        color: '#514F51',
    },
    loginText: {
        textAlign: 'center',
        color: '#0F37DF',
        fontWeight: '900',
    },
    underlineText: {
        textDecorationLine: 'underline',
    },
})

export default SignUp
