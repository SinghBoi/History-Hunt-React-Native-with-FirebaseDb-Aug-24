import { View, Image } from 'react-native'
import React from 'react'

const ImageComp = ({url, style}) => {
  return (
    <View>
      <Image source={{uri: url}} style={style} />
    </View>
  )
}

export default ImageComp