import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  checkAuth,
  setAuthorizationSuccess,
} from '../../store/actions/authorization';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkCompatibility } from '../../utils/biometrics';
import { authenticateAsync, isEnrolledAsync } from 'expo-local-authentication';

const AppCheckState = () => {
  const dispatch = useDispatch();

  const checkBiometricsState = useCallback(async () => {
    const biometricsEnabled = JSON.parse(
      await AsyncStorage.getItem('BIOMETRICS_ENABLED'),
    );

    if (biometricsEnabled) {
      const status = await checkCompatibility();
      if (status) {
        const enrolled = await isEnrolledAsync();
        if (!enrolled) {
          console.log(
            "This device doesn't have biometric authentication enabled",
          );
          await dispatch(checkAuth());
        } else {
          const token = JSON.parse(await AsyncStorage.getItem('TOKEN'));
          if (token) {
            const result = await authenticateAsync();
            if (!result.success) {
              console.log('Authentication unsuccessful');
            } else {
              await dispatch(checkAuth());
            }
          }
        }
      }
    }
  }, []);

  const checkAppSate = async () => {
    checkBiometricsState();
    // await dispatch(checkAuth());
    setTimeout(() => {
      SplashScreen.hide();
    }, 0);
  };

  useEffect(() => {
    checkAppSate();
  }, []);

  return null;
};

export default AppCheckState;
