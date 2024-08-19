import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import PinkText from './PinkText';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig.js';

const CreateHunt = ({ navigation }) => {
  const [duration, setDuration] = useState('');
  const [huntName, setHuntName] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const inputHandler = (inputType, value) => {
    if (inputType === 'duration') {
      setDuration(value);
    } else if (inputType === 'huntName') {
      setHuntName(value);
    }
  };

  const onPressHandler = () => {
    if (duration.trim() === '' || huntName.trim() === '') {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }
    navigation.navigate('inviteFriend', { duration, huntName, selectedImageUri });
  };

  const addImageHandler = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access gallery was denied.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        console.log('Image selection canceled');
        return;
      }

      if (result.assets.length > 0) {
        const imageUri = result.assets[0].uri;

        if (imageUri) {
          // Upload image to Firebase Storage
          const response = await fetch(imageUri);
          const blob = await response.blob();
          const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
          const storageRef = ref(storage, `images/${filename}`);

          await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);
          setSelectedImageUri(downloadURL);
        }
      } else {
        console.log('No image selected');
      }

    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Customize</Text>
        <View style={styles.inputContainer}>
          <PinkText style={styles.textColor}>How long should it be?</PinkText>
          <Input
            style={styles.textInput}
            textInputConfig={{
              autoCapitalize: 'none',
              autoCorrect: false,
              onChangeText: (value) => inputHandler('duration', value),
              placeholder: '3 hours? 2 days? You pick',
            }}
          />
          <PinkText style={styles.textColor}>What do you want to call your hunt?</PinkText>
          <Input
            style={styles.textInput}
            textInputConfig={{
              autoCapitalize: 'none',
              autoCorrect: false,
              onChangeText: (value) => inputHandler('huntName', value),
              placeholder: 'Name',
            }}
          />
        </View>
        <View style={styles.inputImageContainer}>
          <PinkText style={styles.imageText}>Insert Image</PinkText>
          <TouchableOpacity style={styles.circle} onPress={addImageHandler}>
            {selectedImageUri ? (
              <Image source={{ uri: selectedImageUri }} style={styles.selectedImage} />
            ) : (
              <Text style={styles.plusSign}>+</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPressHandler={onPressHandler}>CONTINUE</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  headerText: {
    fontSize: 60,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 40,
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius: 6,
    width: 300,
  },
  textColor: {
    color: '#A20FDF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageText: {
    color: '#A20FDF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusSign: {
    fontSize: 100,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 125,
  },
  buttonContainer: {
    padding: 100,
  },
});

export default CreateHunt;
