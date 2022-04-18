import React from 'react';
import Modal from 'react-native-modal';
import { COLORS } from '../../../constants/colors';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import CloseIcon from '../../../assets/icons/close.svg';
import TextBold from '../../../components/TextWrappers/TextBold';
import ButtonShared from '../../../components/ButtonShared';
import I18n from 'i18n-js';

const DeleteInvestmentModal = ({ isVisible, handleClose, handleDelete }) => {
  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Pressable
              onPress={handleClose}
              hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
              <CloseIcon fill={COLORS.mainBackground} />
            </Pressable>
          </View>
          <TextBold style={styles.heading}>{I18n.t('Are you sure?')}</TextBold>
          <TextRegular style={styles.text}>
            {I18n.t('Do you really want to cancel your investment?')}
          </TextRegular>
          <ButtonShared onPress={handleDelete} style={styles.button}>
            <TextBold style={styles.buttonText}>{I18n.t('Delete')}</TextBold>
          </ButtonShared>
        </View>
      </View>
    </Modal>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    shadowColor: COLORS.shadowColor,
    disabled: {
      opacity: 0.6,
    },
    elevation: 13,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  modal: {
    width: width - 24,
    maxWidth: 400,
    minHeight: 230,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#172619',
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
  closeButton: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: 18,
    color: COLORS.mainBackground,
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: COLORS.graySecondary,
    marginTop: 5,
    textAlign: 'center',
  },
  button: {
    shadowColor: 'transparent',
    width: '90%',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default DeleteInvestmentModal;
