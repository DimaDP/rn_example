import React, { useState } from 'react';
import styles from './ChangePasswordScreenStyles';
import { SafeAreaView, View } from 'react-native';
import TextBold from '../../components/TextWrappers/TextBold';
import TextRegular from '../../components/TextWrappers/TextRegular';
import FKInput from '../../components/FKInput/FKInput';
import { useFormik } from 'formik';
import ButtonShared from '../../components/ButtonShared';
import * as Yup from 'yup';
import FKInputPassword from '../../components/FKInputPassword/FKInputPassword';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import SuccessModal from '../../components/StatusModals/SuccessModal';
import { changePassword } from '../../store/actions/settings';
import ErrorModal from '../../components/StatusModals/ErrorModal';
import I18n from 'i18n-js';

const ChangePasswordScreenSchema = Yup.object().shape({
  password: Yup.string().required(I18n.t('Required')),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    )
    .min(8, I18n.t('To Short!'))
    .max(8, I18n.t('To Long!'))
    .required(I18n.t('Required')),
  confirmation: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], I18n.t('Passwords must match'))
    .required(I18n.t('Required')),
});

const ChangePasswordScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [isOpenSuccessModal, setSuccessModal] = useState(false);
  const [isOpenErrorModal, setErrorModal] = useState(false);
  const [isEnabledTFA, setIsEnabledTFA] = useState(false);

  const { loading } = useSelector(store => store.settings);

  const { handleSubmit, values, errors, setFieldValue } = useFormik({
    validationSchema: ChangePasswordScreenSchema,
    initialValues: { password: '', confirmation: '', newPassword: '' },
    onSubmit: async personalData => {
      const success = await dispatch(
        changePassword({
          currentPassword: personalData.password,
          newPassword: personalData.newPassword,
          tfa: isEnabledTFA,
        }),
      );
      if (success) {
        setSuccessModal(true);
      } else {
        setErrorModal(true);
      }
    },
  });

  const submitValues = () => {
    handleSubmit();
  };

  if (loading) {
    return <Loader />;
  }

  const isSubmitDisabled =
    Object.entries(values).every(item => !!item[1] === true) &&
    !Object.entries(errors).length;

  const handleCloseModal = () => {
    // navigation.navigate('LoginScreen');
    setSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setErrorModal(false);
  };

  const toggleSwitch = () => setIsEnabledTFA(previousState => !previousState);

  return (
    <SafeAreaView style={[styles.container]}>
      {isOpenSuccessModal && (
        <SuccessModal
          isVisible={isOpenSuccessModal}
          handleClose={handleCloseModal}
          text={I18n.t('Success!')}
        />
      )}
      {isOpenErrorModal && (
        <ErrorModal
          isVisible={isOpenErrorModal}
          handleClose={handleCloseErrorModal}
          text={I18n.t('Wrong password!')}
        />
      )}
      <KeyboardWrapper>
        <View style={[styles.formContainer]}>
          <TextRegular style={styles.headingText}>
            {I18n.t('Password')}
          </TextRegular>
          <TextRegular style={styles.label}>
            {I18n.t('Current Password')}
          </TextRegular>
          <FKInput
            value={values.password}
            label={'password'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.password}
            secureTextEntry
          />
          <TextRegular style={styles.label}>
            {I18n.t('New Password')}
          </TextRegular>
          <FKInputPassword
            value={values.newPassword}
            label={'newPassword'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.newPassword}
          />
          <TextRegular style={styles.label}>
            {I18n.t('Confirm New Password')}
          </TextRegular>
          <FKInput
            value={values.confirmation}
            label={'confirmation'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.confirmation}
            secureTextEntry
          />
          {/*<TextRegular style={styles.headingText}>Extra Security</TextRegular>*/}
          {/*<View style={styles.tfa}>*/}
          {/*  <Switch*/}
          {/*    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}*/}
          {/*    trackColor={{ false: COLORS.white, true: COLORS.linkColor }}*/}
          {/*    thumbColor={isEnabledTFA ? COLORS.white : COLORS.graySecondary}*/}
          {/*    ios_backgroundColor={COLORS.white}*/}
          {/*    onValueChange={toggleSwitch}*/}
          {/*    value={isEnabledTFA}*/}
          {/*  />*/}
          {/*  <TextRegular style={styles.switchText}>*/}
          {/*    Two-Factor Authentification*/}
          {/*  </TextRegular>*/}
          {/*</View>*/}
        </View>
        <View style={styles.button}>
          <ButtonShared onPress={submitValues} disabled={!isSubmitDisabled}>
            <TextBold style={styles.buttonText}>{I18n.t('SAVE')}</TextBold>
          </ButtonShared>
        </View>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
