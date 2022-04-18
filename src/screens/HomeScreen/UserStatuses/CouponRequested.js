import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import RequestImage from '../../../assets/icons/statuses/couponRequested.svg';
import TextBold from '../../../components/TextWrappers/TextBold';
import TextLight from '../../../components/TextWrappers/TextLight';

const CouponRequested = () => {
  return (
    <View style={styles.container}>
      <RequestImage />
      <TextBold style={styles.heading}>Let’s continue</TextBold>
      <TextLight style={styles.text}>
        To verify your face and dive into the tokens world, you need to complete
        the KYC process at your postal office.
      </TextLight>
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
});

export default CouponRequested;
