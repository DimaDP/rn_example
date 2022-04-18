import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './LoginStyles';
import ButtonShared from '../../components/ButtonShared';
import TextBold from '../../components/TextWrappers/TextBold';
import TextRegular from '../../components/TextWrappers/TextRegular';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/authorization';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import FKInput from '../../components/FKInput/FKInput';
import Loader from '../../components/Loader/Loader';
import ErrorModal from '../../components/StatusModals/ErrorModal';
import I18n from 'i18n-js';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(4).max(100),
});

const LoginScreen = ({ navigation }) => {
  const isIOS = Platform.OS === 'ios';

  const dispatch = useDispatch();

  const { loading, alert } = useSelector(store => store.authorization);

  const [isOpenErrorModal, setOpenErrorModal] = useState(false);

  const { handleSubmit, values, errors, setFieldValue } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async loginValues => {
      await dispatch(
        login({
          email: loginValues.email,
          password: loginValues.password,
        }),
      );
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFieldValue('email', '');
      setFieldValue('password', '');
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (alert) {
      setOpenErrorModal(true);
    }
  }, [alert]);

  if (loading) {
    return <Loader />;
  }

  const setPaddingTop = () => {
    if (!isIOS) {
      return StatusBar.currentHeight;
    }
    return 0;
  };

  const handleLogin = e => {
    handleSubmit(e);
  };

  const navigateToRestore = () => {
    navigation.navigate('RestoreScreen');
  };

  const isSubmitEnabled =
    Object.values(errors).length === 0 && values.email && values.password;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: setPaddingTop() }]}>
      <KeyboardWrapper>
        <View style={styles.form}>
          <View style={styles.heading}>
            <TextRegular style={styles.signInText}>
              {I18n.t('Please sign in to continue')}
            </TextRegular>
          </View>
          <View>
            <TextRegular style={styles.textLabel}>
              {I18n.t('Email')}
            </TextRegular>
            <FKInput
              value={values.email}
              label={'email'}
              keyboardType={'email-address'}
              handleChange={setFieldValue}
              error={errors.email}
            />
          </View>
          <View>
            <TextRegular style={styles.textLabel}>{I18n.t('Password')}</TextRegular>
            <FKInput
              secureTextEntry
              value={values.password}
              label={'password'}
              keyboardType={'default'}
              handleChange={setFieldValue}
              error={errors.password}
            />
          </View>
          <View>
            <View style={styles.restore}>
              <View />
              <TouchableOpacity onPress={navigateToRestore}>
                <TextRegular style={styles.restoreText}>
                  {I18n.t('Forgot password?')}
                </TextRegular>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonIos}>
            <ButtonShared
              disabled={!isSubmitEnabled}
              onPress={handleLogin}
              style={styles.button}>
              <TextBold style={styles.buttonText}>{I18n.t('Sign in')}</TextBold>
            </ButtonShared>
          </View>
        </View>
      </KeyboardWrapper>
      <ErrorModal
        handleClose={() => setOpenErrorModal(false)}
        text={`${I18n.t('Wrong password or email')}\n ${I18n.t('Try again')}`}
        isVisible={isOpenErrorModal}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
