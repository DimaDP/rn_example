import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const TextBold = ({ children, style, numberOfLines }) => {
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
    fontFamily: 'Poppins-SemiBold',
  },
});

TextBold.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
  numberOfLines: PropTypes.number,
};

TextBold.defaultProps = {
  style: {},
  numberOfLines: 0,
};

export default TextBold;
