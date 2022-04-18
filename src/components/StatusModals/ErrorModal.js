import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import TextBold from '../TextWrappers/TextBold';
import TextRegular from '../TextWrappers/TextRegular';
import { COLORS } from '../../constants/colors';
import ErrorIcon from '../../assets/icons/error_toast.svg';
import I18n from 'i18n-js';

const ErrorModal = ({ isVisible, handleClose, text }) => {
  return (
    <Modal
      customBackdrop={
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      }
      style={{
        flex: 1,
      }}
      animationType='slide'
      transparent={true}
      isVisible={isVisible}
      onRequestClose={handleClose}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={handleClose}>
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleClose}>
              <View style={styles.modal}>
                <View style={styles.innerContainer}>
                  <ErrorIcon />
                  <View style={styles.textContainer}>
                    <TextBold style={styles.heading}>
                      {I18n.t('Error!')}
                    </TextBold>
                    <TextRegular style={styles.text}>{text}</TextRegular>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
};

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: COLORS.errorColor,
    width: screenWidth - 32,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  heading: {
    color: COLORS.white,
    fontSize: 16,
  },
  text: {
    color: COLORS.white,
    fontSize: 12,
    flexWrap: 'wrap',
  },
});

export default ErrorModal;
