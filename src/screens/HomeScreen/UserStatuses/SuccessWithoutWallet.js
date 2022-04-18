import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import ReviewImage from '../../../assets/icons/statuses/pending.svg';
import TextBold from '../../../components/TextWrappers/TextBold';
import TextLight from '../../../components/TextWrappers/TextLight';
import I18n from 'i18n-js';

const SuccessWithoutWallet = () => {
  return (
    <View style={styles.container}>
      <ReviewImage />
      <TextBold style={styles.heading}>{I18n.t('Bear with us')}</TextBold>
      <TextLight style={styles.text}>
        {I18n.t(
          'Your identity is successfully verified! We are setting up your investor profile and will notify you when it is ready',
        )}
      </TextLight>
    </View>
  );
};

const containerWidth = Dimensions.get('window').width - 32;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.inputBackground,
    width: containerWidth,
    // height: containerWidth * 0.7,
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 25,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
    shadowColor: COLORS.shadowColor,
    elevation: 13,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  heading: {
    fontSize: 16,
    color: COLORS.white,
  },
  text: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 10,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default SuccessWithoutWallet;
