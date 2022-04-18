import React from 'react';
import { Modal, View, StyleSheet, Dimensions, Pressable } from 'react-native';
import TextBold from '../../../components/TextWrappers/TextBold';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import ButtonShared from '../../../components/ButtonShared';
import { COLORS } from '../../../constants/colors';
import SuccessImage from '../../../assets/images/Congrads.svg';

const width = Dimensions.get('window').width;

const SuccessModal = ({ handleClose, isVisible }) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <SuccessImage />
          <TextBold style={styles.heading}>Congrats!</TextBold>
          <TextRegular style={styles.text}>
            You have completed KYC, we will send you an email when your face is
            identified
          </TextRegular>
          <ButtonShared onPress={handleClose} style={styles.button}>
            <TextBold style={styles.buttonText}>HOME</TextBold>
          </ButtonShared>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    width: width - 24,
    maxWidth: 400,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#172619',
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
  heading: {
    fontSize: 18,
    color: COLORS.mainBackground,
    marginTop: 5,
  },
  text: {
    fontSize: 14,
    color: COLORS.graySecondary,
    marginTop: 5,
  },
  button: {
    shadowColor: 'transparent',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default SuccessModal;
