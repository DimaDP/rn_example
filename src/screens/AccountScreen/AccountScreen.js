import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import TextRegular from '../../components/TextWrappers/TextRegular';
import FKInput from '../../components/FKInput/FKInput';
import { COLORS } from '../../constants/colors';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CopyIcon from '../../assets/icons/copy.svg';
import CountryPicker from '../KYCScreen/CountryPicker/CountryPicker';
import { validateName, validateNumber } from '../../utils/validators';
import ButtonShared from '../../components/ButtonShared';
import TextBold from '../../components/TextWrappers/TextBold';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, setUserInfo } from '../../store/actions/settings';
import Loader from '../../components/Loader/Loader';
import I18n from 'i18n-js';

const AccountSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required('Required'),
  lastName: Yup.string().min(3).max(50).required('Required'),
  country: Yup.string().required('Required'),
  city: Yup.string().min(3).max(50).required('Required'),
  street: Yup.string().min(3).max(50).required('Required'),
  buildingNumber: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const AccountScreen = ({ navigation }) => {
  const { userInfo, loading } = useSelector(store => store.settings);
  const dispatch = useDispatch();
  const { handleSubmit, setValues, values, errors, setFieldValue } = useFormik({
    validationSchema: AccountSchema,
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      city: '',
      country: '',
      street: '',
      buildingNumber: '',
      zipCode: '',
      walletNumber: '123689754866913295666',
    },
    onSubmit: personalData => {
      // navigation.navigate('ConfirmRegistration');
      dispatch(setUserInfo(personalData));
    },
  });

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    if (userInfo) {
      setValues({
        name: userInfo.name,
        lastName: userInfo.lastName,
        city: userInfo.city,
        email: userInfo.email,
        country: userInfo.country,
        street: userInfo.street,
        buildingNumber: userInfo.buildingNumber,
        zipCode: userInfo.zipCode,
        walletNumber: userInfo.walletNumber || '123689754866913295666',
      });
    }
  }, [userInfo]);

  const submitValues = () => {
    handleSubmit();
  };

  const isSubmitDisabled =
    Object.entries(values).every(item => !!item[1] === true) &&
    !Object.entries(errors).length;

  const handleCopy = () => {
    Clipboard.setString(values.walletNumber);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardWrapper
        style={{ flex: 0 }}
        // viewIsInsideTabBar={true}
        // // enableOnAndroid
        // keyboardOpeningTime={0}
        // bounces={false}
        // extraScrollHeight={50}
        // extraHeight={50}
        // style={styles.inputs}
        // contentContainerStyle={styles.contentContainer}
      >
        {/*<View style={[styles.formContainer]}>*/}
        {/*<TextRegular style={styles.headingText}>*/}
        {/*  Personal Information*/}
        {/*</TextRegular>*/}
        <TextRegular style={styles.label}>{I18n.t('Name')}</TextRegular>
        <FKInput
          value={values.name}
          label={'name'}
          keyboardType={'default'}
          handleChange={setFieldValue}
          error={errors.name}
          validator={validateName}
        />
        <TextRegular style={styles.label}>{I18n.t('Last Name')}</TextRegular>
        <FKInput
          value={values.lastName}
          label={'lastName'}
          keyboardType={'default'}
          handleChange={setFieldValue}
          error={errors.lastName}
          validator={validateName}
        />
        <TextRegular style={styles.label}>{I18n.t('Email')}</TextRegular>
        <FKInput
          value={values.email}
          label={'email'}
          keyboardType={'email-address'}
          handleChange={setFieldValue}
          error={errors.email}
        />
        <TextRegular style={styles.label}>{I18n.t('Country')}</TextRegular>
        <CountryPicker
          error={errors.country}
          country={values.country}
          handleChange={setFieldValue}
        />
        <TextRegular style={styles.label}>{I18n.t('City')}</TextRegular>
        <FKInput
          value={values.city}
          label={'city'}
          keyboardType={'default'}
          handleChange={setFieldValue}
          error={errors.city}
          validator={validateName}
        />
        <TextRegular style={styles.label}>{I18n.t('Street')}</TextRegular>
        <FKInput
          value={values.street}
          label={'street'}
          keyboardType={'default'}
          handleChange={setFieldValue}
          error={errors.street}
          validator={validateName}
        />
        <View style={styles.addressWrapper}>
          <View style={styles.address}>
            <TextRegular style={styles.label}>
              {I18n.t('Apartment ')}№
            </TextRegular>
            <FKInput
              value={values.buildingNumber}
              label={'buildingNumber'}
              keyboardType={'numeric'}
              handleChange={setFieldValue}
              error={errors.buildingNumber}
              validator={validateNumber}
            />
          </View>
          <View style={styles.address}>
            <TextRegular style={styles.label}>{I18n.t('Zip Code')}</TextRegular>
            <FKInput
              value={values.zipCode}
              label={'zipCode'}
              keyboardType={'numeric'}
              handleChange={setFieldValue}
              error={errors.zipCode}
              validator={validateNumber}
            />
          </View>
        </View>
        <TextRegular style={{ ...styles.headingText }}>
          {I18n.t('Account Number')}
        </TextRegular>
        <TextRegular style={styles.label}>
          {I18n.t('Wallet number')}
        </TextRegular>
        <View style={styles.token}>
          <FKInput
            value={values.walletNumber}
            label={'walletNumber'}
            keyboardType={'email-address'}
            handleChange={setFieldValue}
            error={errors.walletNumber}
            disabled
          />
          <TouchableOpacity onPress={handleCopy}>
            <View style={styles.copy}>
              <CopyIcon />
            </View>
          </TouchableOpacity>
        </View>
        {/*</View>*/}
        <View>
          <ButtonShared
            onPress={submitValues}
            style={styles.button}
            disabled={!isSubmitDisabled}>
            <TextBold style={styles.buttonText}>{I18n.t('SAVE')}</TextBold>
          </ButtonShared>
        </View>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  heading: {
    color: COLORS.white,
    fontSize: 25,
  },
  headingText: {
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: COLORS.mainBackground,
  },
  label: {
    marginLeft: 15,
    color: COLORS.white,
    fontSize: 12,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: COLORS.inputBackground,
    width: 24,
    height: 24,
    borderRadius: 2,
    overflow: 'hidden',

    borderColor: COLORS.linkColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  termsText: {
    marginLeft: 20,
    color: COLORS.white,
    fontSize: 12,
  },
  token: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
  },
  copy: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  address: {
    width: '47%',
  },
  addressWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default AccountScreen;
