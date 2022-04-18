import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DownIcon from '../../../assets/icons/down_ch.svg';
import { COLORS } from '../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../../../store/actions/kyc';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import { setRouterColor } from '../../../store/actions/statusBar';

const CountryPicker = ({ error, handleChange, country }) => {
  const dispatch = useDispatch();
  const { countries } = useSelector(store => store.kyc);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [touched, wasTouched] = useState(false);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    setItems(countries);
  }, [countries]);

  useEffect(() => {
    if (country) {
      setValue(country);
    }
  }, [country]);

  const setLocale = async tittle => {
    handleChange('country', tittle());
    setValue(tittle);
  };

  const openModal = e => {
    setOpen(e);
    wasTouched(true);
  };

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
    <View style={styles.container}>
      <DropDownPicker
        searchable={false}
        placeholder={''}
        listMode='SCROLLVIEW'
        disableBorderRadius={false}
        open={open}
        value={value}
        items={items}
        setOpen={openModal}
        setValue={setLocale}
        setItems={setItems}
        style={[styles.dropdownContainer, { borderColor: validationColor }]}
        textStyle={styles.textStyle}
        dropDownContainerStyle={
          !open
            ? styles.dropDownContainerStyle
            : styles.dropDownContainerStyleActive
        }
        TickIconComponent={() => null}
        ArrowDownIconComponent={() => <DownIcon />}
        ArrowUpIconComponent={() => <DownIcon />}
        searchTextInputProps={styles.searchTextInputProps}
        searchPlaceholder='Search...'
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
    zIndex: 100,
    marginTop: 6,
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

export default CountryPicker;
