import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import TextRegular from '../TextWrappers/TextRegular';
import ErrorIcon from '../../assets/icons/error.svg';
import I18n from 'i18n-js';

const FKInput = ({
  clearSelectedItem = () => {},
  label,
  value,
  keyboardType,
  handleChange,
  error,
  disabled = false,
  secureTextEntry = false,
  validator = text => text,
  style = {},
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [touched, wasTouched] = useState(false);

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
    clearSelectedItem();
  };
  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const onChangeText = text => {
    handleChange(label, validator(text));
  };

  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        autoCorrect={false}
        onFocus={() => handleInputFocus()}
        onBlur={() => handleInputBlur()}
        onChangeText={onChangeText}
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
            ...style,
          },
        ]}
      />
      <TextRegular style={styles.error}>
        {touched && error && I18n.t(error)}
      </TextRegular>
      {error && touched && <ErrorIcon style={styles.icon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 6,
    flexGrow: 1,
    maxHeight: 72,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.white,
    fontSize: 16,
    borderRadius: 6,
    height: 42,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontFamily: 'Poppins-Medium',
  },
  error: {
    paddingLeft: 10,
    color: COLORS.errorColor,
    fontSize: 12,
    height: 20,
  },
  icon: {
    position: 'absolute',
    top: 18,
    right: 15,
  },
});

export default FKInput;
