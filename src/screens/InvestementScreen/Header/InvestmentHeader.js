import { StyleSheet, TouchableOpacity } from 'react-native';
import DocsIcon from '../../../assets/icons/docs.svg';
import { COLORS } from '../../../constants/colors';
import React from 'react';

export const HeaderRight = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate('Contracts');
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.rightContainer}>
      <DocsIcon fill={COLORS.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    paddingHorizontal: 24,
  },
});
