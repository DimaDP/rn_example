import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import styles from './TokenScreenStyles';
import PropertiesList from '../HomeScreen/PropertiesList/PropertiesList';
import TextLight from '../../components/TextWrappers/TextLight';
import TextBold from '../../components/TextWrappers/TextBold';
import { COLORS } from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import ButtonShared from '../../components/ButtonShared';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenProperties } from '../../store/actions/tokens';
import KYCModal from '../../components/KYCModal/KYCModal';
import { useFocusEffect } from '@react-navigation/native';
import {
  setRouterColor,
  setStatusBarColor,
} from '../../store/actions/statusBar';
import { getUserKYCInformation } from '../../store/actions/kyc';
import Loader from '../../components/Loader/Loader';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import I18n from 'i18n-js';

const TokenScreen = ({ route }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const [isOpenKycModal, setIsOpenKycModal] = useState(false);
  const dispatch = useDispatch();
  const { tokenById, loading } = useSelector(state => state.tokens);

  useEffect(() => {
    dispatch(getTokenProperties(route.params.id));
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(setStatusBarColor(COLORS.mainBackground));
      dispatch(setRouterColor(COLORS.mainBackground));
    }, [dispatch]),
  );

  if (loading) {
    return <Loader />;
  }

  const handleChangeText = text => {
    setValue(text.replace(/[^0-9]/g, ''));
  };

  const handleInputFocus = textinput => {
    setIsFocused({
      [textinput]: true,
    });
  };

  const handleInputBlur = textinput => {
    setIsFocused({
      [textinput]: false,
    });
  };

  const handlePress = async () => {
    await dispatch(getUserKYCInformation());
    setIsOpenKycModal(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KYCModal
        isVisible={isOpenKycModal}
        handleClose={() => setIsOpenKycModal(false)}
        amount={value}
        tokenId={route.params.id}
      />
      <KeyboardWrapper
        style={{ paddingHorizontal: 0 }}
        extraScrollHeight={0}
        extraHeight={0}>
        <PropertiesList />
        <View style={styles.containerInner}>
          <TextBold style={styles.heading}>Property Highlights</TextBold>
          <View style={styles.props}>
            <View>
              <View style={styles.propsUnit}>
                <TextLight style={styles.propsText}>Expected Yield:</TextLight>
                <TextBold style={styles.propsValue}>11.67 %</TextBold>
              </View>
              <View style={styles.propsUnit}>
                <TextLight style={styles.propsText}>Rent per token:</TextLight>
                <TextBold style={styles.propsValue}>€ 6.06/year</TextBold>
              </View>
            </View>

            <View>
              <View style={styles.propsUnit}>
                <TextLight style={styles.propsText}>Token price:</TextLight>
                <TextBold style={styles.propsValue}>€ 51.97</TextBold>
              </View>
              <View style={styles.propsUnit}>
                <TextLight style={styles.propsText}>Total tokens:</TextLight>
                <TextBold style={styles.propsValue}>6.500</TextBold>
              </View>
            </View>
          </View>
          <TextBold style={styles.heading}>Calculate profit</TextBold>

          <View style={styles.props}>
            <View>
              <View style={styles.propsUnit}>
                <TextBold style={styles.calculateValue}>63 %</TextBold>
                <TextLight style={styles.calculateText}>funded</TextLight>
              </View>
            </View>

            <View>
              <View style={styles.propsUnit}>
                <TextBold style={styles.calculateValue}>€ 234.00</TextBold>
                <TextLight style={styles.calculateText}>available</TextLight>
              </View>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <LinearGradient
              useAngle={true}
              angle={270}
              colors={['#5B7DF3', '#99CEFF']}
              style={styles.progress}
            />
          </View>

          <View style={styles.props}>
            <View>
              <View style={styles.propsUnit}>
                <TextLight style={styles.propsText}>Interest rate:</TextLight>
                <TextBold style={styles.propsValue}>13% + 3%</TextBold>
              </View>
            </View>

            <View>
              <View style={styles.propsUnit}>
                <TextLight style={styles.propsText}>Duration:</TextLight>
                <TextBold style={styles.propsValue}>6 months</TextBold>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              onFocus={() => handleInputFocus('value')}
              onBlur={() => handleInputBlur('value')}
              selectionColor='white'
              value={value}
              onChangeText={handleChangeText}
              placeholderTextColor={COLORS.white}
              keyboardType='default'
              style={[
                styles.input,
                {
                  borderWidth: 1,
                  paddingLeft: 40,
                  borderColor: isFocused
                    ? COLORS.linkColor
                    : COLORS.transparent,
                },
              ]}
            />
            <Image
              source={{
                uri: tokenById.icon,
              }}
              style={styles.logo}
            />
          </View>
        </View>
      </KeyboardWrapper>
      <ButtonShared
        onPress={handlePress}
        style={styles.button}
        disabled={!value}>
        <TextBold
          style={{
            fontSize: 16,
            color: COLORS.white,
            textAlign: 'center',
          }}>
          {I18n.t('BUY')}
        </TextBold>
      </ButtonShared>
    </SafeAreaView>
  );
};

export default TokenScreen;
