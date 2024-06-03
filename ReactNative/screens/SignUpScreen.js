import { View, Text, StyleSheet } from 'react-native'
import Title from '../components/Title'
import SignUpForm from '../components/SignUpForm'

const SignUp = ({ navigation }) => {   

    return (
    <View style={styles.mainContainer}>
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Title> History Hunt </Title>
            </View>
            <View style={styles.signUpContainer}>
                <View style={styles.formContainer}>
                    <SignUpForm />                    
                </View>                    
                <View style={styles.formContainer}>
                    <Text style={styles.termCondition}> By signing up I accept the
                    <Text style={styles.underlineText}> term of use </Text> and the
                    <Text style={styles.underlineText}> data privacy policy. </Text></Text>
                    <Text style={styles.text}> Already have an account? </Text>
                    <Text style={styles.loginText} onPress={()=> navigation.navigate('LoginScreen')}> Log in here </Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpContainer: {
        flex: 4,
        marginTop: 26,
        alignItems: 'center',
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
