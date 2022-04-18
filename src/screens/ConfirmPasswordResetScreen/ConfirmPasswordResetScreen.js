import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ConfirmPasswordReserScreenStyles';
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
import I18n from 'i18n-js';

const CELL_COUNT = 5;

const ConfirmPasswordResetScreen = ({ route, navigation }) => {
  const [value, setValue] = useState('');
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

  const handleNextStep = () => {
    navigation.navigate('CreateNewPasswordScreen', { code: route.params.key });
  };

  const isSubmitDisabled = value.length === 5;

  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        enableOnAndroid
        keyboardOpeningTime={0}
        bounces={false}
        extraHeight={50}
        style={styles.inputs}
        contentContainerStyle={styles.contentContainer}>
        <View style={[styles.formContainer]}>
          <TextBold style={styles.heading}>
            {I18n.t('Check your Email')}
          </TextBold>
          <TextRegular style={styles.headingText}>
            {I18n.t('Enter 5 digits verification code')}
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
        <ButtonShared onPress={handleNextStep} disabled={!isSubmitDisabled}>
          <TextBold style={styles.buttonText}>{I18n.t('Continue')}</TextBold>
        </ButtonShared>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmPasswordResetScreen;
