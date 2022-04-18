import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import TextBold from '../TextWrappers/TextBold';
import TextRegular from '../TextWrappers/TextRegular';
import { COLORS } from '../../constants/colors';
import SuccessIcon from '../../assets/icons/succes.svg';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import I18n from 'i18n-js';

const SuccessModal = ({ isVisible, handleClose, text }) => {
  return (
    <Modal
      onBackdropPress={handleClose}
      style={{
        flex: 1,
      }}
      customBackdrop={
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      }
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
                  <SuccessIcon />
                  <View style={styles.textContainer}>
                    <TextBold style={styles.heading}>
                      {I18n.t('Success!')}
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
    backgroundColor: COLORS.positiveSum,
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
    color: COLORS.favoriteButtonColor,
    fontSize: 16,
  },
  text: {
    color: COLORS.favoriteButtonColor,
    fontSize: 12,
    flexWrap: 'wrap',
  },
});

export default SuccessModal;
