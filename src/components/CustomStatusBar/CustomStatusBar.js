import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

export const CustomStatusBar = ({ backgroundColor, ...props }) => {
  const { color } = useSelector(store => store.statusBar);
  return (
    <View style={[styles.statusBar, { backgroundColor: color }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={color} {...props} />
      </SafeAreaView>
    </View>
  );
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
