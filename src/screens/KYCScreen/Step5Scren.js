import React, { useState } from 'react';
import { styles } from './styles';
import { TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import TextBold from '../../components/TextWrappers/TextBold';
import TextRegular from '../../components/TextWrappers/TextRegular';
import { useFormik } from 'formik';
import ButtonShared from '../../components/ButtonShared';
import * as Yup from 'yup';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import DocumentsPicker from './DocumentsPicker/DocumentsPicker';
import UploadIcon from '../../assets/icons/upload.svg';
import DocumentPicker from 'react-native-document-picker';
import SuccessModal from './SuccessModal/SuccessModal';

const LoginSchema = Yup.object().shape({
  document: Yup.string().required('Required'),
});

const Step5Screen = ({ navigation }) => {
  const [result, setResult] = useState();
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const { handleSubmit, handleBlur, values, errors, touched, setFieldValue } =
    useFormik({
      validationSchema: LoginSchema,
      // validateOnChange: false,
      // validateOnBlur: false,
      initialValues: {
        document: '',
      },
      onSubmit: values => {
        console.log('inner submit');
      },
    });
  const submitValues = () => {
    handleSubmit();
    setIsOpenSuccessModal(true);
  };

  const pickFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setResult([pickerResult]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseModal = () => {
    setIsOpenSuccessModal(false);
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, { zIndex: -1 }]}>
      <SuccessModal
        handleClose={handleCloseModal}
        isVisible={isOpenSuccessModal}
      />
      <View
        style={[
          styles.innerContainer,
          { zIndex: -1, justifyContent: 'space-between' },
        ]}>
        <View>
          <View style={{ borderColor: 'red', borderWidth: 1, zIndex: 1000 }}>
            <TextRegular style={styles.headingText}>Step 5 of 5</TextRegular>
            <TextRegular style={styles.label}>Documents</TextRegular>
            <DocumentsPicker
              handleChange={setFieldValue}
              error={errors.document}
            />
            <TouchableOpacity onPress={pickFile}>
              <View style={styles.uploadButton}>
                <UploadIcon />
                <TextRegular style={styles.uploadButtonText}>
                  Upload files
                </TextRegular>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ButtonShared onPress={submitValues} style={styles.button}>
          <TextBold style={styles.buttonText}>SAVE</TextBold>
        </ButtonShared>
      </View>
    </View>
  );
};

export default Step5Screen;
