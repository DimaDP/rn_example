import React from 'react';
import { Modal, View, StyleSheet, Dimensions, Pressable } from 'react-native';
import TextRegular from '../TextWrappers/TextRegular';
import { COLORS } from '../../constants/colors';
import CloseIcon from '../../assets/icons/close.svg';
import TextBold from '../TextWrappers/TextBold';
import ButtonShared from '../ButtonShared';
import I18n from 'i18n-js';

const width = Dimensions.get('window').width;

const LogoutModal = ({ handleClose, isVisible, logout }) => {
  console.log('render');
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
          <TextBold style={styles.heading}>{I18n.t('Log out?')}</TextBold>
          <TextRegular style={styles.text}>
            {I18n.t('Are you sure want to log out?')}
          </TextRegular>
          <ButtonShared onPress={logout} style={styles.button}>
            <TextBold style={styles.buttonText}>{I18n.t('LOG OUT')}</TextBold>
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
    height: 230,
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
  },
});

export default LogoutModal;
