import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FavoriteIcon from '../../assets/icons/favorites.svg';
import BackIcon from '../../assets/icons/back_arrow.svg';
import { COLORS } from '../../constants/colors';

export const HeaderRight = () => {
  const onPress = () => {
    console.log('pressed');
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.rightContainer}>
      <FavoriteIcon fill={COLORS.white} />
    </TouchableOpacity>
  );
};

export const HeaderLeft = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.rightContainer}>
      <BackIcon fill={COLORS.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    paddingHorizontal: 24,
  },
});
