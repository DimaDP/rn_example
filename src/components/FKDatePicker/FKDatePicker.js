import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import TextRegular from '../TextWrappers/TextRegular';
import ErrorIcon from '../../assets/icons/error.svg';
import DatePicker from 'react-native-date-picker';
import CalendarIcon from '../../assets/icons/calendar.svg';
import { formatDateForForms } from '../../utils/date';

const FKDatePicker = ({
  label,
  validator = () => {},
  error,
  value,
  disabled = true,
  handleChange,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [touched, wasTouched] = useState(false);

  const [open, setOpen] = useState(false);

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
    setOpen(true);
  };
  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const onChangeText = text => {
    handleChange(label, validator(text));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setOpen(!open);
      }}>
      <TextInput
        onTouchStart={() => {
          setOpen(!open);
        }}
        {...rest}
        editable={!disabled}
        autoCorrect={false}
        onFocus={() => handleInputFocus()}
        onBlur={() => handleInputBlur()}
        onChangeText={onChangeText}
        value={value}
        selectionColor={COLORS.white}
        placeholderTextColor={COLORS.white}
        keyboardType={'numbers-and-punctuation'}
        autoCapitalize='none'
        style={[
          styles.input,
          {
            borderWidth: 1,
            borderColor: validationColor,
          },
        ]}
      />
      <CalendarIcon style={styles.calendarIcon} />
      <TextRegular style={styles.error}>{touched && error}</TextRegular>
      {error && touched && <ErrorIcon style={styles.icon} />}
      <DatePicker
        modal
        mode={'date'}
        open={open}
        date={value ? new Date(value) : new Date()}
        onConfirm={date => {
          setOpen(false);
          handleChange(label, formatDateForForms(date));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
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
    marginTop: 10,
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
    top: 16,
    right: 15,
  },
  calendarIcon: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
});

export default FKDatePicker;
