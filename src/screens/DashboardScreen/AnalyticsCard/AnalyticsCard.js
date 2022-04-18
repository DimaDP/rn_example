import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/colors';

const width = Dimensions.get('window').width / 2 - 16 - 6;

const AnalyticsCard = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    width,
    minHeight: 120,
    marginBottom: 13,
  },
});

export default AnalyticsCard;
