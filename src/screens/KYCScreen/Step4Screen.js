import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { COLORS } from '../../constants/colors';
import TextBold from '../../components/TextWrappers/TextBold';
import TextRegular from '../../components/TextWrappers/TextRegular';
import FKInput from '../../components/FKInput/FKInput';
import { useFormik } from 'formik';
import ButtonShared from '../../components/ButtonShared';
import * as Yup from 'yup';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';

const LoginSchema = Yup.object().shape({
  taxResidence: Yup.string().required('Required'),
  taxId: Yup.string().required('Required'),
});

const Step4Screen = ({ navigation }) => {
  const { handleSubmit, handleBlur, values, errors, touched, setFieldValue } =
    useFormik({
      validationSchema: LoginSchema,
      // validateOnChange: false,
      // validateOnBlur: false,
      initialValues: {
        taxResidence: '',
        taxId: '',
      },
      onSubmit: values => {},
    });
  const submitValues = () => {
    handleSubmit();
    navigation.navigate('Step 5');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer]}>
        <KeyboardWrapper>
          <TextRegular style={styles.headingText}>Step 4 of 5</TextRegular>
          <TextRegular style={styles.label}>TAX Residence</TextRegular>
          <FKInput
            value={values.taxResidence}
            label={'taxResidence'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.taxResidence}
          />
          <TextRegular style={styles.label}>TAX ID</TextRegular>
          <FKInput
            value={values.taxId}
            label={'taxId'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.taxId}
          />
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

export default Step4Screen;
