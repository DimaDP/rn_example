import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const TextLight = ({ children, style, numberOfLines }) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      style={{ ...styles.default, ...style }}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Poppins-Light',
  },
});

TextLight.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
  numberOfLines: PropTypes.number,
};

TextLight.defaultProps = {
  style: {},
  numberOfLines: 0,
};

export default TextLight;
