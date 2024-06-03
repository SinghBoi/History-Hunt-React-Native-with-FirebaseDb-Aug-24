import { View, Text, StyleSheet } from 'react-native'
import Title from '../components/Title'
import LoginForm from '../components/LoginForm'

const Login = ({ navigation }) => {

    return (
    <View style={styles.mainContainer}>
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Title> History Hunt </Title>
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.formContainer}>
                    <LoginForm />                    
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.text}> Need to make an account? </Text>
                    <Text style={styles.signUpText} onPress={()=> navigation.navigate('SignUpScreen')}> Sign up here </Text>
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
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 4,
        marginTop: 26,
        alignContent: 'center',
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
