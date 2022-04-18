import React, { useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import TextBold from '../../components/TextWrappers/TextBold';
import ButtonShared from '../../components/ButtonShared';
import Logo from '../../assets/images/logo.svg';
import LogoSmall from '../../assets/images/logo_sm.svg';
import TextRegular from '../../components/TextWrappers/TextRegular';
import TextLight from '../../components/TextWrappers/TextLight';
import { useFocusEffect } from '@react-navigation/native';
import {
  setRouterColor,
  setStatusBarColor,
} from '../../store/actions/statusBar';
import { useDispatch } from 'react-redux';
import I18n from 'i18n-js';

const SignInScreen = function ({ navigation }) {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setStatusBarColor(COLORS.mainBackground));
      dispatch(setRouterColor(COLORS.mainBackground));
    }, [dispatch]),
  );

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [navigation],
  );

  const navigateToSignIn = () => {
    navigation.navigate('LoginScreen');
  };

  const navigateToSignUp = () => {
    navigation.navigate('Registration');
  };

  return (
    <>
      <View style={styles.backgroundStyle}>
        <View style={styles.buttons}>
          <View style={styles.heading}>
            <Logo width={33} height={44} />
            <TextRegular style={styles.headingText}>REFUTURE</TextRegular>
            <LogoSmall width={8} height={8} />
            <TextRegular style={styles.headingText}>SE</TextRegular>
          </View>
          <TextBold style={styles.headingText}>
            {I18n.t('Welcome to the world of Token')}
          </TextBold>
          <TextRegular style={styles.headingSmall}>
            {I18n.t('Invest, buy and sell in one safe and simple app')}
          </TextRegular>
        </View>
        <View style={styles.buttonsContainer}>
          <ButtonShared onPress={navigateToSignUp} style={styles.singUp}>
            <TextBold style={styles.signInText}>{I18n.t('SIGN UP')}</TextBold>
          </ButtonShared>
          <View style={styles.signIn}>
            <TextLight style={styles.light}>
              {I18n.t('Already have an account?')}
            </TextLight>
            <TouchableOpacity onPress={navigateToSignIn}>
              <TextRegular style={styles.link}>{I18n.t('Sign in')}</TextRegular>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
    color: COLORS.white,
    paddingBottom: '10%',
    paddingHorizontal: 16,
  },
  text: {
    color: COLORS.white,
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  signIn: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singUp: {
    marginVertical: 15,
  },
  signInText: {
    color: 'white',
    lineHeight: 48,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  signUpText: {
    color: COLORS.activeColor,
    lineHeight: 48,
    textAlign: 'center',
    letterSpacing: 2,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20%',
  },
  headingText: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.white,
    // marginHorizontal: 10,
  },
  headingSmall: {
    marginVertical: 10,
    fontSize: 14,
    color: COLORS.white,
    // marginHorizontal: 10,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  light: {
    fontSize: 14,
    color: COLORS.white,
    marginRight: 10,
  },
  link: {
    color: COLORS.linkColor,
    fontSize: 14,
  },
});

export default SignInScreen;
