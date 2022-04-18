import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import styles from './BiometricsScreenStyles';
import TextRegular from '../../components/TextWrappers/TextRegular';
import FaceIdIcon from '../../assets/images/Face ID.svg';
import TouchIdIcon from '../../assets/images/Touch ID.svg';
import ButtonShared from '../../components/ButtonShared';
import TextBold from '../../components/TextWrappers/TextBold';
import {
  checkAvailableAuthTypes,
  checkCompatibility,
} from '../../utils/biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from 'i18n-js';

const BiometricsScreen = ({ navigation }) => {
  const [compatible, setCompatible] = useState({
    status: false,
    types: [],
  });

  const setDeviceStatus = useCallback(async () => {
    const status = await checkCompatibility();
    if (status) {
      const types = await checkAvailableAuthTypes();

      setCompatible({
        types,
        status,
      });
    } else {
      navigation.navigate('Root');
    }
  }, [navigation]);

  useEffect(() => {
    setDeviceStatus();
  }, [setDeviceStatus]);

  const handleEnable = async () => {
    await AsyncStorage.setItem('BIOMETRICS_ENABLED', JSON.stringify(true));
    await AsyncStorage.setItem('BIOMETRICS_NOT_NOW', JSON.stringify(false));
    navigation.navigate('Root');
  };

  const handleChooseLater = async () => {
    await AsyncStorage.setItem('BIOMETRICS_NOT_NOW', JSON.stringify(true));
    await AsyncStorage.setItem('BIOMETRICS_ENABLED', JSON.stringify(false));
    navigation.navigate('Root');
  };

  const isWithFaceId = compatible.types[compatible.types.length - 1] === 2;
  const isWithTouchId = compatible.types[compatible.types.length - 1] === 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInner}>
        {isWithFaceId && <FaceIdIcon />}
        {isWithTouchId && <TouchIdIcon />}
        {isWithFaceId && (
          <TextRegular style={styles.text}>
            {I18n.t(
              'Use Face ID for faster and easier access to your Refuture Account',
            )}
          </TextRegular>
        )}
        {isWithTouchId && (
          <TextRegular style={styles.text}>
            {I18n.t(
              'Use Touch ID for faster and easier access to your Refuture Account',
            )}
          </TextRegular>
        )}
      </View>
      <ButtonShared onPress={handleEnable} style={styles.button}>
        <TextBold style={styles.buttonText}>{I18n.t('ENABLE')}</TextBold>
      </ButtonShared>
      <TouchableOpacity style={styles.notNow} onPress={handleChooseLater}>
        <TextRegular style={styles.buttonText}>{I18n.t('Not now')}</TextRegular>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BiometricsScreen;
