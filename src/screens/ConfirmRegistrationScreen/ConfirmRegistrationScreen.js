import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ConfirmRegistrationScreenStyles';
import TextBold from '../../components/TextWrappers/TextBold';
import TextRegular from '../../components/TextWrappers/TextRegular';
import ButtonShared from '../../components/ButtonShared';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { useDispatch } from 'react-redux';
import { activateAccount } from '../../store/actions/authorization';
import SuccessModal from '../../components/StatusModals/SuccessModal';
import I18n from 'i18n-js';

const CELL_COUNT = 5;

const ConfirmRegistrationScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isOpenErrorModal, setOpenErrorModal] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    Alert.alert('CODE', `${route.params.key}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }, []);

  const sendCode = async () => {
    return await dispatch(activateAccount(value));
  };

  const isSubmitDisabled = value.length === 5;

  const resendCode = () => {
    Alert.alert('CODE', `${route.params.key}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const handleSubmit = async () => {
    const isSuccess = await sendCode();
    if (isSuccess) {
      setOpenErrorModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenErrorModal(false);
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      {isOpenErrorModal && (
        <SuccessModal
          isVisible={isOpenErrorModal}
          text={I18n.t('You have successfully registered')}
          handleClose={handleCloseModal}
        />
      )}
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        enableOnAndroid
        keyboardOpeningTime={0}
        bounces={false}
        extraHeight={50}
        style={styles.inputs}
        contentContainerStyle={styles.contentContainer}>
        <View style={[styles.formContainer]}>
          <TextBold style={styles.heading}>{I18n.t('Verify its you')}</TextBold>
          <TextRegular style={styles.headingText}>
            {I18n.t('Confirm the email you provided before')}
          </TextRegular>
          {/*<TextRegular style={styles.label}>Verification code</TextRegular>*/}
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor color={'white'} /> : null)}
              </Text>
            )}
          />
          <View>
            <View style={styles.restore}>
              <View />
              <TouchableOpacity onPress={resendCode}>
                <TextRegular style={styles.restoreText}>
                  {I18n.t('Resend code')}
                </TextRegular>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.button}>
        <ButtonShared onPress={handleSubmit} disabled={!isSubmitDisabled}>
          <TextBold style={styles.buttonText}>{I18n.t('SEND')}</TextBold>
        </ButtonShared>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmRegistrationScreen;
