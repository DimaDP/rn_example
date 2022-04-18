import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DownIcon from '../../../assets/icons/down_ch.svg';
import { COLORS } from '../../../constants/colors';
import TextRegular from '../../../components/TextWrappers/TextRegular';

const DocumentsPicker = ({ handleChange, error }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Driver’s License', value: 'Driver’s License' },
    { label: 'ID card', value: 'ID card' },
    { label: 'Passport ', value: 'Passport' },
    { label: 'Residence permit', value: 'Residence permit' },
  ]);

  const setLocale = async tittle => {
    setValue(tittle);
    handleChange('document', tittle);
  };

  return (
    <View style={[styles.container, { zIndex: 1000 }]}>
      <DropDownPicker
        placeholder={''}
        listMode='SCROLLVIEW'
        disableBorderRadius={false}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setLocale}
        setItems={setItems}
        style={
          !open
            ? error
              ? styles.dropdownError
              : styles.dropdownContainer
            : styles.dropdownContainerActive
        }
        textStyle={styles.textStyle}
        dropDownContainerStyle={
          !open
            ? styles.dropDownContainerStyle
            : styles.dropDownContainerStyleActive
        }
        TickIconComponent={() => null}
        ArrowDownIconComponent={() => <DownIcon />}
        ArrowUpIconComponent={() => <DownIcon />}
      />
      <TextRegular style={styles.error}>{error}</TextRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // zIndex: 1000,
    marginTop: 6,
    marginBottom: 15,
    paddingVertical: 4,
  },
  dropdownContainer: {
    height: 42,
    backgroundColor: COLORS.graySecondary,
    borderColor: 'transparent',
  },
  dropdownContainerActive: {
    height: 42,
    backgroundColor: COLORS.graySecondary,
    borderColor: '#5B7DF3',
  },
  textStyle: {
    color: COLORS.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  dropDownContainerStyle: {
    marginTop: 12,
    backgroundColor: COLORS.graySecondary,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dropDownContainerStyleActive: {
    marginTop: 12,
    backgroundColor: COLORS.graySecondary,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#5B7DF3',
  },
  dropdownError: {
    height: 42,
    backgroundColor: COLORS.graySecondary,
    borderColor: COLORS.errorColor,
  },
  buttonText: {
    color: 'white',
    lineHeight: 48,
    textAlign: 'center',
    letterSpacing: 2,
  },
  error: {
    paddingLeft: 10,
    color: COLORS.errorColor,
    fontSize: 16,
    minHeight: 20,
  },
});

export default DocumentsPicker;
