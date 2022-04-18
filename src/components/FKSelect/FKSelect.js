import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import DownIcon from '../../assets/icons/down_ch.svg';
import TextRegular from '../TextWrappers/TextRegular';
import I18n from 'i18n-js';

const FKSelect = ({
  open,
  onOpen,
  dropDownDirection = 'AUTO',
  error,
  label,
  handleChange,
  selectedItem,
  itemsList,
  style = {},
  containerStyle = {},
}) => {
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [touched, wasTouched] = useState(false);

  const openModal = e => {
    onOpen();
    wasTouched(true);
  };

  const handleSetValue = tittle => {
    setValue(tittle);
    handleChange(label, [
      ...itemsList.map(item => {
        if (item.label === I18n.t(tittle())) {
          return {
            ...item,
            selected: true,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      }),
    ]);
  };

  useEffect(() => {
    setItems(itemsList);
    setValue(selectedItem);
  }, [selectedItem]);

  let validationColor = 'transparent';

  if (open && error) {
    validationColor = COLORS.errorColor;
  }

  if (open && !error) {
    validationColor = COLORS.linkColor;
  }

  if (!open && error && touched) {
    validationColor = COLORS.errorColor;
  }

  return (
    <View
      style={[styles.container, { zIndex: open ? 1000 : 0 }, containerStyle]}>
      <DropDownPicker
        searchable={false}
        dropDownDirection={dropDownDirection}
        placeholder={''}
        listMode='SCROLLVIEW'
        disableBorderRadius={false}
        open={open}
        value={value}
        items={itemsList}
        setOpen={openModal}
        setValue={handleSetValue}
        setItems={setItems}
        style={[
          styles.dropdownContainer,
          { borderColor: validationColor },
          style,
        ]}
        textStyle={styles.textStyle}
        dropDownContainerStyle={[
          !open
            ? styles.dropDownContainerStyle
            : styles.dropDownContainerStyleActive,
          style,
        ]}
        TickIconComponent={() => null}
        ArrowDownIconComponent={() => <DownIcon />}
        ArrowUpIconComponent={() => <DownIcon />}
        searchTextInputProps={styles.searchTextInputProps}
        searchContainerStyle={{
          borderBottomColor: 'transparent',
        }}
        searchPlaceholderTextColor={COLORS.darkTextColor}
      />
      <TextRegular style={styles.error}>{touched && error}</TextRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // zIndex: 101,
    marginTop: 6,
    paddingVertical: 2,
    flex: 1,
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
    marginVertical: 12,
    backgroundColor: COLORS.graySecondary,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#5B7DF3',
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
    fontSize: 12,
    height: 20,
  },
  searchTextInputProps: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    maxLength: 25,
    color: '#fff',
    borderColor: COLORS.linkColor,
  },
});

export default FKSelect;
