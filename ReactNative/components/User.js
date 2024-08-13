import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useState,useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import ImageComp from './ImageComp'
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig.js';
import { UserContext } from '../store/userContext.js';
import { getUserId, updateUser } from '../util/http.js';

const User = ({ user }) => {
    const [imageUri, setImageUri] = useState(user.imageUri)
    const [userId, setUserId] = useState(null);
    const userContext = useContext(UserContext);
    const navigation = useNavigation()

    useEffect(() => {
        const fetchId = async () => {
            try {
                const id = await getUserId(user.email);                
                setUserId(id);
            } catch (error) {
                console.error("Error fetching userId:", error);
            }
        };

        fetchId();
    }, []);



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
            aspect: [1, 1],
            quality: 1,
        });

        if (selectedImage.canceled) {
            console.log('Image selection canceled');
            return;
        }

        // Extract the URI of the selected image from the assets array
        const selectedImageUri = selectedImage.assets.length > 0 ? selectedImage.assets[0].uri : null;

        //
        if (selectedImageUri) {
            // Upload image to Firebase Storage
            const response = await fetch(selectedImageUri);
            const blob = await response.blob();

            const filename = selectedImageUri.substring(selectedImageUri.lastIndexOf('/') + 1);
            const storageRef = ref(storage, `images/${ filename }`);

            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            // Update the user's imageUri field
            const updatedUser = { ...user, imageUri: downloadURL };
            userContext.updateUser(userId, updatedUser);
            console.log("updated user------------------", updatedUser)
            await updateUser(userId, updatedUser)
            console.log("edithandler", userId)
            setImageUri(downloadURL);
        }
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
