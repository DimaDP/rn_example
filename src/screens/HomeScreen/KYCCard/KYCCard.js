import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import LogoSmall from '../../../assets/images/logo_sm.svg';
import { COLORS } from '../../../constants/colors';
import ButtonShared from '../../../components/ButtonShared';
import I18n from 'i18n-js';

const KYCCard = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Logo width={33} height={44} />
        <TextRegular style={styles.headingText}>REFUTURE</TextRegular>
        <LogoSmall width={8} height={8} />
        <TextRegular style={styles.headingText}>SE</TextRegular>
      </View>
      <TextRegular style={styles.text}>
        {/*To unlock all app features and make your first invest please finish the*/}
        {/*KYC process.*/}
        {I18n.t('To unlock the app features, make your first investment')}
      </TextRegular>
      <ButtonShared style={styles.singUp} onPress={onPress}>
        <TextRegular style={styles.signInText}>
          {I18n.t('Buy Token')}
        </TextRegular>
      </ButtonShared>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 238,
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBackground,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 25,
    marginBottom: 25,
    borderRadius: 8,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 20,
    color: COLORS.white,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
  singUp: {
    marginVertical: 15,
  },
  signInText: {
    color: 'white',
    lineHeight: 48,
    textAlign: 'center',
    letterSpacing: 0.02,
    fontSize: 14,
  },
});

export default KYCCard;
