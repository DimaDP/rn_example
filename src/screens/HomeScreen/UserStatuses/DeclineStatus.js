import React from 'react';
import {
  Dimensions,
  Linking,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/colors';
import DeclineImage from '../../../assets/icons/statuses/declined.svg';
import TextBold from '../../../components/TextWrappers/TextBold';
import TextLight from '../../../components/TextWrappers/TextLight';
import CopyIcon from '../../../assets/icons/copy.svg';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

const DeclineStatus = () => {
  const { redirectUrlWeb } = useSelector(store => store.kyc);

  const handleCopy = () => {
    Clipboard.setString(redirectUrlWeb);
  };

  const openUrl = () => {
    if (redirectUrlWeb) {
      Linking.canOpenURL(redirectUrlWeb).then(supported => {
        if (supported) {
          Linking.openURL(redirectUrlWeb);
        } else {
          console.log("Don't know how to open URI: " + redirectUrlWeb);
        }
      });
    }
  };
  return (
    <View style={styles.container}>
      <DeclineImage />
      <TextBold style={styles.heading}>Oh no!</TextBold>
      <TextLight style={styles.text}>
        We found some issues in your KYC process, please follow the link below
        and try again
      </TextLight>
      <View style={styles.urlWrapper}>
        <Pressable onPress={openUrl} style={{ flex: 1, alignItems: 'center' }}>
          <TextLight numberOfLines={1} style={styles.link}>
            {redirectUrlWeb}
          </TextLight>
        </Pressable>
        <TouchableOpacity onPress={handleCopy}>
          <View style={styles.copy}>
            <CopyIcon />
          </View>
        </TouchableOpacity>
      </View>
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
  urlWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: COLORS.linkColor,
    fontSize: 12,
  },
  copy: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 6,
  },
});

export default DeclineStatus;
