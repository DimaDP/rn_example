import React from 'react';
import Modal from 'react-native-modal';
import { COLORS } from '../../../constants/colors';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextLight from '../../../components/TextWrappers/TextLight';
import I18n from 'i18n-js';
import EyeIcon from '../../../assets/icons/eyeFilled.svg';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import { useNavigation } from '@react-navigation/native';

const PdfSlider = ({ isOpen, item, onClose, handleSubmit = () => {} }) => {
  const navigation = useNavigation();

  const onOpenPdf = () => {
    onClose();
    navigation.navigate('PdfModal', { item, handleSubmit });
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      isVisible={isOpen}
      animationInTiming={300}
      animationOutTiming={500}
      backdropColor={COLORS.transparent}
      style={styles.modal}>
      <View style={styles.menu}>
        <TextLight style={styles.menuHeading}>
          {/*{I18n.t('Active transaction')}*/}
          {item.name}
        </TextLight>
        <TouchableOpacity style={styles.edit} onPress={onOpenPdf}>
          <EyeIcon />
          <TextRegular style={styles.editText}>{I18n.t('Open')}</TextRegular>
        </TouchableOpacity>
        {/*<TouchableOpacity style={styles.delete} onPress={() => {}}>*/}
        {/*  <TrashIcon />*/}
        {/*  <TextMedium style={styles.deleteText}>{I18n.t('Delete')}</TextMedium>*/}
        {/*</TouchableOpacity>*/}
        <View style={styles.divider} />
        <TouchableOpacity style={styles.close} onPress={onClose}>
          <TextRegular style={styles.closeText}>{I18n.t('Close')}</TextRegular>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  menu: {
    height: 210,
    paddingTop: 16,
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBackground,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  menuHeading: {
    marginLeft: 16,
    fontSize: 12,
    letterSpacing: 0.5,
    color: COLORS.white,
  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  editText: {
    marginLeft: 22,
    fontSize: 14,
    color: COLORS.darkTextColor,
  },
  delete: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  deleteText: {
    marginLeft: 22,
    color: COLORS.linkColor,
    fontSize: 14,
  },
  closeText: {
    fontSize: 14,
    color: COLORS.white,
  },
  close: {
    alignItems: 'center',
    minHeight: 70,
  },
  divider: {
    backgroundColor: COLORS.inActiveTabIcon,
    width: '100%',
    height: 0.6,
  },
});

export default PdfSlider;
