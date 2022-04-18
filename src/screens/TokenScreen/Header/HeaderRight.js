import { StyleSheet, TouchableOpacity } from 'react-native';
import SelectedIcon from '../../../assets/icons/selected_lg.svg';
import { COLORS } from '../../../constants/colors';
import React from 'react';

export const HeaderRight = props => {
  const onPress = () => {
    // navigation.navigate('Contracts');
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.rightContainer}>
      <SelectedIcon fill={COLORS.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    paddingHorizontal: 24,
  },
});
