import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const TextRegular = ({ children, style, numberOfLines }) => (
  <Text
    numberOfLines={numberOfLines}
    allowFontScaling={false}
    style={{ ...styles.default, ...style }}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Poppins-Regular',
  },
});

TextRegular.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
};

TextRegular.defaultProps = {
  style: {},
  numberOfLines: 0,
};

export default TextRegular;
