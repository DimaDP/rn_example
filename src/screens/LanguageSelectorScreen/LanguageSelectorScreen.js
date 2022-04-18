import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextBold from '../../components/TextWrappers/TextBold';
import DropDownPicker from 'react-native-dropdown-picker';
import German from '../../assets/icons/countries/german.svg';
import English from '../../assets/icons/countries/english.svg';
import DownIcon from '../../assets/icons/down_ch.svg';
import TextMedium from '../../components/TextWrappers/TextMedium';
import ButtonShared from '../../components/ButtonShared';
import i18n from '../../../i18n/i18n';
import { styles } from './LanguageSelectorScreenStyles';
import I18n from 'i18n-js';

const LanguageSelectorScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('en');
  const [items, setItems] = useState([
    { label: 'English', value: 'en', icon: English },
    { label: 'German', value: 'de', icon: German },
  ]);
  // const [wasVisited, setWasVisited] = useState(true);

  const checkInitialState = useCallback(async () => {
    const selectedLanguage = await AsyncStorage.getItem('LANGUAGE_KEY');
    const wasVisited = await AsyncStorage.getItem('WAS_VISITED');
    if (selectedLanguage) {
      i18n.locale = JSON.parse(selectedLanguage);
      setValue(JSON.parse(selectedLanguage));
    }
    if (wasVisited) {
      navigation.navigate('SignInScreen');
    } else {
      navigation.navigate('Onboarding');
    }
  }, [navigation]);

  useEffect(() => {
    checkInitialState().then();
  }, [checkInitialState]);

  const setLocale = async lang => {
    const currentLang = lang();
    setValue(lang);
    i18n.locale = currentLang;
    await AsyncStorage.setItem('LANGUAGE_KEY', JSON.stringify(currentLang));
  };

  const handleNavigate = () => navigation.navigate('Onboarding');

  return null;

  // eslint-disable-next-line no-unreachable
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TextMedium style={styles.heading}>
          Please choose the app language
        </TextMedium>
        <DropDownPicker
          disableBorderRadius={false}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setLocale}
          setItems={setItems}
          style={styles.dropdownContainer}
          textStyle={styles.textStyle}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          TickIconComponent={() => null}
          ArrowDownIconComponent={() => <DownIcon />}
          ArrowUpIconComponent={() => <DownIcon />}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <ButtonShared onPress={handleNavigate}>
          <TextBold style={styles.buttonText}>NEXT</TextBold>
        </ButtonShared>
      </View>
    </SafeAreaView>
  );
};

export default LanguageSelectorScreen;
