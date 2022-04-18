import React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardWrapper = ({ children, style = {}, ...rest }) => {
  const isIos = Platform.OS === 'ios';
  return isIos ? (
    <KeyboardAwareScrollView
      // enableOnAndroid
      // nestedScrollEnabled={true}
      viewIsInsideTabBar={true}
      keyboardOpeningTime={0}
      extraScrollHeight={90}
      extraHeight={50}
      // bounces={false}
      // resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
      contentContainerStyle={[styles.formContainerIos, { ...style }]}
      {...rest}>
      {children}
    </KeyboardAwareScrollView>
  ) : (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={[styles.formContainer, { ...style }]}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 150,
  },
  formContainerIos: {
    // flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default KeyboardWrapper;
