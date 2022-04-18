import React from 'react';
import { styles } from './styles';
import { View } from 'react-native';
import { COLORS } from '../../constants/colors';
import TextBold from '../../components/TextWrappers/TextBold';
import TextRegular from '../../components/TextWrappers/TextRegular';
import FKInput from '../../components/FKInput/FKInput';
import { useFormik } from 'formik';
import ButtonShared from '../../components/ButtonShared';
import * as Yup from 'yup';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';

const LoginSchema = Yup.object().shape({
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

const Step3Screen = ({ navigation }) => {
  const { handleSubmit, handleBlur, values, errors, touched, setFieldValue } =
    useFormik({
      validationSchema: LoginSchema,
      // validateOnChange: false,
      // validateOnBlur: false,
      initialValues: {
        country: '',
        city: '',
        street: '',
        apartment: '',
        zipCode: '',
      },
      onSubmit: values => {},
    });
  const submitValues = () => {
    handleSubmit();
    navigation.navigate('Step 4');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer]}>
        <KeyboardWrapper>
          <TextRegular style={styles.headingText}>Step 3 of 5</TextRegular>
          <TextRegular style={styles.label}>Country</TextRegular>
          <FKInput
            value={values.country}
            label={'country'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.country}
          />
          <TextRegular style={styles.label}>City</TextRegular>
          <FKInput
            value={values.lastName}
            label={'city'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.city}
          />
          <TextRegular style={styles.label}>Street</TextRegular>
          <FKInput
            value={values.street}
            label={'number'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.street}
          />
          <View style={styles.addressWrapper}>
            <View style={styles.address}>
              <TextRegular style={styles.label}>Apartment №</TextRegular>
              <FKInput
                value={values.apartment}
                label={'apartment'}
                keyboardType={'default'}
                handleChange={setFieldValue}
                error={errors.apartment}
              />
            </View>
            <View style={styles.address}>
              <TextRegular style={styles.label}>Zip Code</TextRegular>
              <FKInput
                value={values.zipCode}
                label={'zipCode'}
                keyboardType={'numeric'}
                handleChange={setFieldValue}
                error={errors.zipCode}
              />
            </View>
          </View>
        </KeyboardWrapper>
        <ButtonShared onPress={submitValues} style={styles.button}>
          <TextBold
            style={{
              fontSize: 16,
              color: COLORS.white,
              textAlign: 'center',
            }}>
            SAVE
          </TextBold>
        </ButtonShared>
      </View>
    </View>
  );
};

export default Step3Screen;
