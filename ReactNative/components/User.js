import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import ImageComp from './ImageComp'
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const User = ({ user }) => {
    const [imageUri, setImageUri] = useState(user.image)
    const navigation = useNavigation()

    const onPressHandler = () => {
        navigation.navigate('LoginScreen')
    }

const editHandler = async () => {
    try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access gallery was denied');
            return;
        }
        
        const selectedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (selectedImage.canceled) {
            console.log('Image selection canceled');
            return;
        }

        // Extract the URI of the selected image from the assets array
        const selectedImageUri = selectedImage.assets.length > 0 ? selectedImage.assets[0].uri : null;

        setImageUri(selectedImageUri);
    } catch (error) {
        console.error('Error selecting image:', error);
    }
}

    return (
        <View style={styles.container}>
            <MaterialIcons style={styles.iconButton} name="logout" size={34} color="orange" onPress={onPressHandler}/>
            <View>
                <ImageComp url={imageUri} style={styles.image} />
                <MaterialIcons style={styles.editIcon} name="edit" size={15} color="white" borderRadius= '50%' onPress={editHandler}/>
            </View>
            <Text style={styles.text}>{user.fullName}</Text>
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
    },
    editIcon: {
        borderRadius: 20,
        alignSelf: 'flex-start',
        padding: 5,
        backgroundColor: 'orange',
        position: 'absolute',
        top: 95, 
        right:90, 
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default User;
