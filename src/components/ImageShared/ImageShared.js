import React, { useState } from 'react';
import { StyleSheet, Image, ImageBackground } from 'react-native';
import DefaultImage from '../../assets/images/default.png';

const ImageShared = ({ source, style }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ImageBackground
      style={[styles.image, { ...style }]}
      source={isLoading ? DefaultImage : null}>
      <Image
        source={source}
        style={[styles.image, { ...style }]}
        resizeMode={'cover'}
        onLoad={() => setIsLoading(false)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
});

export default ImageShared;
