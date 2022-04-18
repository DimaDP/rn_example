import React, { useState } from 'react';
import styles from './RegistrationScreenStyles';
import { Pressable, SafeAreaView, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import TextBold from '../../components/TextWrappers/TextBold';
import TextRegular from '../../components/TextWrappers/TextRegular';
import FKInput from '../../components/FKInput/FKInput';
import { useFormik } from 'formik';
import ButtonShared from '../../components/ButtonShared';
import * as Yup from 'yup';
import FKInputPassword from '../../components/FKInputPassword/FKInputPassword';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/actions/authorization';
import CheckIcon from '../../assets/icons/checked.svg';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import ErrorModal from '../../components/StatusModals/ErrorModal';

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    )
    .min(8, 'Too Short!')
    .max(8, 'Too Long!')
    .required('Required'),
  confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(store => store.authorization);

  const [checked, setChecked] = useState(false);
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);

  const { handleSubmit, values, errors, setFieldValue } = useFormik({
    validationSchema: RegistrationSchema,
    initialValues: { email: '', password: '', confirmation: '' },
    onSubmit: async personalData => {
      const registered = await dispatch(register(personalData));
      if (registered) {
        navigation.navigate('ConfirmRegistration', { key: registered });
      } else {
        setOpenErrorModal(true);
      }
    },
  });

  const checkPrivacy = () => setChecked(!checked);

  const submitValues = () => {
    handleSubmit();
  };

  if (loading) {
    return <Loader />;
  }

  const isSubmitDisabled =
    Object.entries(values).every(item => !!item[1] === true) &&
    !Object.entries(errors).length &&
    checked;

  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardWrapper>
        <View style={[styles.formContainer]}>
          <TextBold style={styles.heading}>Let's start</TextBold>
          <TextRegular style={styles.headingText}>
            Please enter your credentials to proceed
          </TextRegular>
          <TextRegular style={styles.label}>Email</TextRegular>
          <FKInput
            value={values.email}
            label={'email'}
            keyboardType={'email-address'}
            handleChange={setFieldValue}
            error={errors.email}
          />
          <TextRegular style={styles.label}>Password</TextRegular>
          <FKInputPassword
            value={values.password}
            label={'password'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.password}
          />
          <TextRegular style={styles.label}>Confirm password</TextRegular>
          <FKInput
            value={values.confirmation}
            label={'confirmation'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.confirmation}
            secureTextEntry
          />
          <View style={styles.privacy}>
            <Pressable
              onPress={checkPrivacy}
              hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: !checked
                      ? COLORS.transparent
                      : COLORS.linkColor,
                  },
                ]}>
                {checked && <CheckIcon fill={COLORS.white} />}
              </View>
            </Pressable>
            <TextRegular style={styles.termsText}>
              I agree to the{' '}
              <TextRegular style={styles.link}>Terms of Service</TextRegular>{' '}
              and <TextRegular style={styles.link}>Privacy Policy</TextRegular>.
            </TextRegular>
          </View>
          <View style={styles.button}>
            <ButtonShared onPress={submitValues} disabled={!isSubmitDisabled}>
              <TextBold style={styles.buttonText}>NEXT</TextBold>
            </ButtonShared>
          </View>
        </View>
      </KeyboardWrapper>
      {/*</KeyboardAwareScrollView>*/}

      {/*<View style={styles.button}>*/}
      {/*  <ButtonShared onPress={submitValues} disabled={!isSubmitDisabled}>*/}
      {/*    <TextBold style={styles.buttonText}>NEXT</TextBold>*/}
      {/*  </ButtonShared>*/}
      {/*</View>*/}
      {isOpenErrorModal && (
        <ErrorModal
          text={'Email is already in use!'}
          handleClose={() => setOpenErrorModal(false)}
          isVisible={isOpenErrorModal}
        />
      )}
    </SafeAreaView>
  );
};

export default RegistrationScreen;
