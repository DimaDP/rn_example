import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import SuccessImage from '../../../assets/icons/statuses/success.svg';
import TextBold from '../../../components/TextWrappers/TextBold';
import TextLight from '../../../components/TextWrappers/TextLight';
import CloseIcon from '../../../assets/icons/close.svg';
import I18n from 'i18n-js';

const SuccessStatus = ({ handlePress }) => {
  const onClose = () => {
    handlePress();
  };
  return (
    <View style={styles.container}>
      <SuccessImage />
      <TextBold style={styles.heading}>{I18n.t('Are you ready!')}</TextBold>
      <TextLight style={styles.text}>
        {I18n.t(
          'Your profile and wallet are all set up! To continue with the investment process, deposit funds. Check your email',
        )}
      </TextLight>
      <Pressable
        onPress={onClose}
        style={styles.close}
        hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
        <CloseIcon fill={COLORS.white} />
      </Pressable>
    </View>
  );
};

const containerWidth = Dimensions.get('window').width - 32;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.inputBackground,
    width: containerWidth,
    height: containerWidth * 0.7,
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

export default SuccessStatus;
