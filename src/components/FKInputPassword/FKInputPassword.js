import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import TextRegular from '../TextWrappers/TextRegular';
import EyeOpen from '../../assets/icons/eye.svg';
import I18n from 'i18n-js';

const FKInputPassword = ({
  label,
  value,
  keyboardType,
  handleChange,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [touched, wasTouched] = useState(false);
  const [isSecure, setSecure] = useState(true);

  let validationColor = 'transparent';

  if (isFocused && error) {
    validationColor = COLORS.errorColor;
  }

  if (isFocused && !error) {
    validationColor = COLORS.linkColor;
  }

  if (!isFocused && error && touched) {
    validationColor = COLORS.errorColor;
  }

  const handleInputFocus = () => {
    wasTouched(true);
    setIsFocused(true);
  };
  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleShowPassword = () => {
    setSecure(!isSecure);
  };

  function checkLowerCase(str) {
    return str === str.toLowerCase() && str !== str.toUpperCase();
  }

  function checkUpperCase(str) {
    return str === str.toUpperCase() && str !== str.toLowerCase();
  }

  const is8Symbols = value.length === 8;
  const isUppercase = value.split('').some(checkUpperCase);
  const isLowercase = value.split('').some(checkLowerCase);
  const isNumber = value.split('').some(item => isNaN(item) === false);

  return (
    <View>
      <TextInput
        autoCorrect={false}
        secureTextEntry={isSecure}
        onFocus={() => handleInputFocus()}
        onBlur={() => handleInputBlur()}
        onChangeText={text => {
          // TODO function for text replacement
          handleChange(label, text);
        }}
        value={value}
        selectionColor={COLORS.white}
        placeholderTextColor={COLORS.white}
        keyboardType={keyboardType}
        autoCapitalize='none'
        style={[
          styles.input,
          {
            borderWidth: 1,
            borderColor: validationColor,
          },
        ]}
      />
      {value.length > 0 && (
        <Pressable
          hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
          onPress={handleShowPassword}
          style={styles.icon}>
          <EyeOpen />
        </Pressable>
      )}
      {touched && (
        <View style={styles.errorContainer}>
          <View
            style={[
              styles.errorItem,
              {
                backgroundColor: is8Symbols
                  ? COLORS.positiveSum
                  : COLORS.inputBackground,
              },
            ]}>
            <TextRegular
              style={{
                ...styles.errorText,
                color: is8Symbols
                  ? COLORS.mainBackground
                  : COLORS.darkTextColor,
              }}
              numberOfLines={1}>
              {I18n.t('8 symbols')}
            </TextRegular>
          </View>

          <View
            style={[
              styles.errorItem,
              {
                backgroundColor: isUppercase
                  ? COLORS.positiveSum
                  : COLORS.inputBackground,
              },
            ]}>
            <TextRegular
              style={{
                ...styles.errorText,
                color: isUppercase
                  ? COLORS.mainBackground
                  : COLORS.darkTextColor,
              }}
              numberOfLines={1}>
              {I18n.t('Capital letter')}
            </TextRegular>
          </View>

          <View
            style={[
              styles.errorItem,
              {
                backgroundColor: isLowercase
                  ? COLORS.positiveSum
                  : COLORS.inputBackground,
              },
            ]}>
            <TextRegular
              style={{
                ...styles.errorText,
                color: isLowercase
                  ? COLORS.mainBackground
                  : COLORS.darkTextColor,
              }}
              numberOfLines={1}>
              {I18n.t('Lowercase')}
            </TextRegular>
          </View>

          <View
            style={[
              styles.errorItem,
              {
                backgroundColor: isNumber
                  ? COLORS.positiveSum
                  : COLORS.inputBackground,
              },
            ]}>
            <TextRegular
              style={{
                ...styles.errorText,
                color: isNumber ? COLORS.mainBackground : COLORS.darkTextColor,
              }}
              numberOfLines={1}>
              {I18n.t('Number')}
            </TextRegular>
          </View>
        </View>
      )}
      <View style={styles.error} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.white,
    fontSize: 16,
    borderRadius: 6,
    height: 40,
    marginTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontFamily: 'Poppins-Medium',
  },
  error: {
    color: COLORS.errorColor,
    fontSize: 16,
    height: 20,
  },
  icon: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
  errorContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  errorItem: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 6,
    flex: 1,
  },
  errorText: {
    color: COLORS.mainBackground,
    fontSize: 12,
  },
});

export default FKInputPassword;
