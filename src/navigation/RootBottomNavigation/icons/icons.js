import React from 'react';
import HomeIcon from '../../../assets/icons/home.svg';
import SettingsIcon from '../../../assets/icons/settings.svg';
import DashboardIcon from '../../../assets/icons/tokens.svg';
import DotIcon from '../../../assets/icons/dot.svg';
import { COLORS } from '../../../constants/colors';
import { View, StyleSheet } from 'react-native';

export const HomeTabIcon = ({ focused }) => {
  return (
    <View style={styles.container}>
      <DotIcon fill={focused ? COLORS.white : COLORS.transparent} />
      <View style={styles.spacer} />
      <HomeIcon fill={focused ? COLORS.white : COLORS.inActiveTabIcon} />
    </View>
  );
};

export const SettingsTabIcon = ({ focused }) => {
  return (
    <View style={styles.container}>
      <DotIcon fill={focused ? COLORS.white : COLORS.transparent} />
      <View style={styles.spacer} />
      <SettingsIcon fill={focused ? COLORS.white : COLORS.inActiveTabIcon} />
    </View>
  );
};

export const DashBoardTabIcon = ({ focused }) => {
  return (
    <View style={styles.container}>
      <DotIcon fill={focused ? COLORS.white : COLORS.transparent} />
      <View style={styles.spacer} />
      <DashboardIcon fill={focused ? COLORS.white : COLORS.inActiveTabIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 30,
    marginBottom: 0,
  },
  spacer: {
    height: 7,
  },
});
