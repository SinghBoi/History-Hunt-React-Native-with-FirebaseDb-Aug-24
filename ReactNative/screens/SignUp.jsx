import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Title from '../components/Title'
import Button from '../components/Button'

const SignUp = () => {
   return (
       <View style={styles.container}>
           <View style={styles.titleContainer}>
                <Text style={styles.backArrow}> ← </Text>
                <Title> History Hunt </Title>
           </View>
           <View style={styles.signUpContainer}>
               <View style={styles.formContainer}>
                    <Text style={styles.profileText}> Profile </Text>
                    <TextInput placeholder='Email' style={styles.textInput}></TextInput>
                    <TextInput placeholder='Name' style={styles.textInput}></TextInput>
                    <TextInput placeholder='Password' style={styles.textInput}></TextInput>
                   <Button> SIGN UP </Button>
                   <Text style={styles.termCondition}> By signing up I accept the 
                   <Text style={styles.underlineText}> term of use </Text> and the 
                   <Text style={styles.underlineText}> data privacy policy. </Text></Text>
                   <Text style={styles.text}> Already have an account? </Text>
                   <Text style={styles.loginText}> Log in here </Text>
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