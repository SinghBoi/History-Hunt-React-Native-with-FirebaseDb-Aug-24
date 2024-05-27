import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Input from './Input'
import PinkText from './PinkText'

const CreateHunt = () => {
  const inputHandler = () => {
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Customize</Text>
      <View>
        <PinkText>How long should it be?</PinkText>
        <Input
          style={styles.textInput}
          textInputConfig={{
              autoCapitalize: "none",
              autoCorrect: false,
              onChangeText: inputHandler,
              placeholder: "3 hours? 2days? You pick",
          }}
      />

      </View>      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  headerText: {
    fontSize: 34,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 40,
    marginBottom: 10,
  },
  textInput: {
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        borderRadius: 6,
    width: 200,
    },
})

export default CreateHunt