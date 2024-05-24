import { View, Text, TextInput } from 'react-native'
import React from 'react'

const Input = ({style, textInputConfig}) => {
  return (
    <View style={[style]}>
          <TextInput {...textInputConfig} />
    </View>
  )
}

export default Input