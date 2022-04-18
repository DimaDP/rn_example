import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import I18n from 'i18n-js';
import ButtonShared from '../../../components/ButtonShared';
import TextBold from '../../../components/TextWrappers/TextBold';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import CloseIcon from '../../../assets/icons/close.svg';
import { COLORS } from '../../../constants/colors';

const { width, height } = Dimensions.get('window');

const ConfirmModal = ({
  handleClose,
  isVisible,
  setCurrentStep,
  handleConfirm,
}) => {
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
          <TextBold style={styles.heading}>Kenntnisnahme</TextBold>
          <ScrollView style={styles.textWrapper}>
            <TextRegular style={styles.text}>
              Die Angemessenheit beurteilt sich danach, ob Du als Anleger/-in
              über die erforderlichen Kenntnisse und Erfahrungen verfügst, um
              die Risiken im Zusammenhang mit der Art der Finanzinstrumente oder
              Wertpapierdienstleistungen angemessen beurteilen zu können. In den
              von Dir zurückgesendeten Unterlagen hast Du unvollständige oder im
              Wesentlichen keine Angaben zu Deinen bisherigen Erfahrungen und
              Kenntnissen...
            </TextRegular>
          </ScrollView>

          <ButtonShared onPress={handleConfirm} style={styles.button}>
            <TextBold style={styles.buttonText}>BESTÄTIGEN</TextBold>
          </ButtonShared>
          <ButtonShared
            borderColor={COLORS.activeColor}
            backGroundColor={COLORS.white}
            onPress={() => setCurrentStep(1)}
            style={styles.button}>
            <TextBold style={styles.buttonText2}>ANGABEN ÄNDERN</TextBold>
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
    maxHeight: 0.7 * height,
    paddingBottom: 16,
    paddingHorizontal: 20,
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
  },
  text: {
    fontSize: 14,
    color: COLORS.graySecondary,
    marginTop: 5,
  },
  button: {
    shadowColor: 'transparent',
    width: '90%',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
  buttonText2: {
    fontSize: 16,
    color: COLORS.activeColor,
    textAlign: 'center',
  },
  textWrapper: {
    borderColor: COLORS.darkTextColor,
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginTop: 10,
  },
});

export default ConfirmModal;
