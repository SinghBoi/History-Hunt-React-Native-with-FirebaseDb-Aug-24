import { View, StyleSheet, } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import ImageComp from './ImageComp'
import { useNavigation } from '@react-navigation/native';

const User = () => {
    const navigation = useNavigation()
    const onPressHandler = () => {
        navigation.navigate('LoginScreen')
    }
    return (
        <View style={styles.container}>
            <MaterialIcons style={StyleSheet.iconButton} name="logout" size={34} color="orange" onPress={onPressHandler}/>
            <View>
                <ImageComp url='https://th.bing.com/th/id/R.50f675f86f20a5ce4590d202d910964a?rik=V6C5rDKUc10VWQ&riu=http%3a%2f%2fmedia1.santabanta.com%2ffull1%2fMiscellaneous%2fCartoon+Characters%2fcartoon-characters-1v.jpg&ehk=YD5iGv4YCSIHOryq0cAnvbecRcTGv11te4BqTC7PbC0%3d&risl=&pid=ImgRaw&r=0' style={styles.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    iconButton: {
        alignItems: 'flex-start',
    },
    image: {
        width: 130,
        height: 130,
        alignSelf: 'center',
        borderRadius: 65,
        borderWidth: 3,
        borderColor: '#A20FDF',
    }
})

export default User