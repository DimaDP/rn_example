import React, { useState } from 'react';
import styles from './CreateNewPasswordScreenStyles';
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
import { confirmResetPasswordByCode } from '../../store/actions/authorization';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import SuccessModal from '../../components/StatusModals/SuccessModal';
import I18n from 'i18n-js';

const RegistrationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    )
    .min(8, I18n.t('Too Short!'))
    .max(8, I18n.t('Too Long!'))
    .required(I18n.t('Required')),
  confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], I18n.t('Passwords must match'))
    .required(I18n.t('Required')),
});

const CreateNewPasswordScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [isOpenSuccessModal, setSuccessModal] = useState(false);

  const { loading, alert } = useSelector(store => store.authorization);

  const { handleSubmit, values, errors, setFieldValue } = useFormik({
    validationSchema: RegistrationSchema,
    initialValues: { password: '', confirmation: '' },
    onSubmit: async personalData => {
      const registered = await dispatch(
        confirmResetPasswordByCode({
          newPassword: personalData.password,
          code: route.params.code,
        }),
      );
      if (registered) {
        setSuccessModal(true);
        // navigation.navigate('LoginScreen');
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
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      {isOpenSuccessModal && (
        <SuccessModal
          isVisible={isOpenSuccessModal}
          handleClose={handleCloseModal}
          text={'Password changed'}
        />
      )}
      <KeyboardWrapper>
        <View style={[styles.formContainer]}>
          <TextBold style={styles.heading}>
            {I18n.t('Create a new password')}
          </TextBold>
          <TextRegular style={styles.headingText}>
            {I18n.t('Come up with new idea for your password')}
          </TextRegular>
          <TextRegular style={styles.label}>{I18n.t('Password')}</TextRegular>
          <FKInputPassword
            value={values.password}
            label={'password'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.password}
          />
          <TextRegular style={styles.label}>
            {I18n.t('Confirm password')}
          </TextRegular>
          <FKInput
            value={values.confirmation}
            label={'confirmation'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.confirmation}
            secureTextEntry
          />
        </View>
        <View style={styles.button}>
          <ButtonShared onPress={submitValues} disabled={!isSubmitDisabled}>
            <TextBold style={styles.buttonText}>{I18n.t('CONTINUE')}</TextBold>
          </ButtonShared>
        </View>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

export default CreateNewPasswordScreen;
