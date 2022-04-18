import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../constants/colors';

const ButtonShared = ({
  children,
  onPress,
  style,
  disabled,
  width = '100%',
  backGroundColor = COLORS.activeColor,
  borderColor = COLORS.activeColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.wrapper, { width }]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View
        style={[
          styles.button,
          {
            ...style,
            borderColor: borderColor,
            backgroundColor: backGroundColor,
            opacity: !disabled ? 1 : 0.6,
          },
        ]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: COLORS.activeColor,
    borderWidth: 1,
    height: 52,
    width: '100%',
    backgroundColor: COLORS.activeColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    shadowColor: COLORS.shadowColor,
    disabled: {
      opacity: 0.6,
    },
    elevation: 13,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  wrapper: {
    borderRadius: 6,
    alignItems: 'center',
  },
});

ButtonShared.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
  disabled: PropTypes.bool,
};

ButtonShared.defaultProps = {
  style: {},
  disabled: false,
};

export default ButtonShared;
