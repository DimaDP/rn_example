import React from 'react';
import MainNavigator from './MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { CustomStatusBar } from '../components/CustomStatusBar/CustomStatusBar';
import { useSelector } from 'react-redux';
import { navigate, navigationRef } from './navigationActions/navigationActions';
import setupAxiosInterceptors from '../api/axios-interceptors';
import AppCheckState from '../components/AppCheckState/AppCheckState';
import { removeAllData, showAllValues } from '../utils/asyncStorage';
import { dispatch } from '../../index';
import { setAuthorizationFail } from '../store/actions/authorization';

setupAxiosInterceptors(() => {
  dispatch(setAuthorizationFail());
  navigate('LoginScreen');
});

const AppContainer = () => {
  showAllValues();
  // removeAllData();

  const mainBackground = useSelector(state => state.statusBar.routerColor);
  return (
    <>
      <CustomStatusBar barStyle='light-content' />
      <AppCheckState />
      <NavigationContainer
        ref={navigationRef}
        // onReady={() => {
        //   setTimeout(() => SplashScreen.hide(), 5000);
        // }}
        theme={{
          colors: {
            background: mainBackground,
          },
        }}>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
};

export default AppContainer;
