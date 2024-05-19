import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Title from '../components/Title'
import Button from '../components/Button'

const Login = () => {
  return (
    <View style={styles.container}>
           <View style={styles.titleContainer}>
                <Title> History Hunt </Title>
           </View>
           <View style={styles.loginContainer}>
               <View style={styles.formContainer}>
                    <Text style={styles.loginText}> Login </Text>
                    <TextInput placeholder='Email' style={styles.textInput}></TextInput>
                    <TextInput placeholder='Password' style={styles.textInput}></TextInput>
                   <Button> CONTINUE </Button>
                   <Text style={styles.text}> Need to make an account? </Text>
                   <Text style={styles.signUpText}> Sign up here </Text>
               </View>
        </View>   
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        flex:1,
        flexDirection: 'row',
        margin: 0,
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