import React, { useState } from 'react';
import TextBold from '../../components/TextWrappers/TextBold';
import styles from '../LoginScreen/LoginStyles';
import { Platform, StatusBar, View } from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import TextRegular from '../../components/TextWrappers/TextRegular';
import FKInput from '../../components/FKInput/FKInput';
import ButtonShared from '../../components/ButtonShared';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { resetPasswordInit } from '../../store/actions/authorization';
import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from '../../components/StatusModals/ErrorModal';
import Loader from '../../components/Loader/Loader';
import I18n from 'i18n-js';

const RestoreSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const RestoreScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const { loading } = useSelector(store => store.authorization);

  const { handleSubmit, values, errors, setFieldValue } = useFormik({
    validationSchema: RestoreSchema,
    initialValues: {
      email: '',
    },
    onSubmit: async email => {
      const key = await dispatch(resetPasswordInit(email));
      if (key) {
        navigation.navigate('ConfirmPasswordReset', { key });
      } else {
        setTimeout(() => setOpenErrorModal(true), 400);
      }
    },
  });

  const isIOS = Platform.OS === 'ios';
  const setPaddingTop = () => {
    if (!isIOS) {
      return StatusBar.currentHeight;
    }
    return 0;
  };

  const handleCloseModal = () => {
    setOpenErrorModal(false);
  };
  const submitEmail = () => {
    handleSubmit();
  };
  const isSubmitEnabled =
    Object.values(errors).length === 0 && values.email && !loading;

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: setPaddingTop() }]}>
      {isOpenErrorModal && (
        <ErrorModal
          text={I18n.t('Email not found')}
          handleClose={handleCloseModal}
          isVisible={isOpenErrorModal}
        />
      )}

      <KeyboardWrapper>
        <View style={styles.form}>
          <View style={styles.heading}>
            <TextBold style={styles.headingLg}>
              {I18n.t('Reset your password')}
            </TextBold>
            <TextRegular style={styles.signInText}>
              {I18n.t(
                'Enter your Email we will send you 5 digits verification code',
              )}
            </TextRegular>
          </View>
          <View>
            <TextRegular style={styles.textLabel}>{I18n.t('Email')}</TextRegular>
            <FKInput
              value={values.email}
              label={'email'}
              keyboardType={'email-address'}
              handleChange={setFieldValue}
              error={errors.email}
            />
          </View>
          <View style={styles.buttonIos}>
            <ButtonShared
              disabled={!isSubmitEnabled}
              onPress={submitEmail}
              style={styles.button}>
              <TextBold style={styles.buttonText}>{I18n.t('CONTINUE')}</TextBold>
            </ButtonShared>
          </View>
        </View>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

export default RestoreScreen;
