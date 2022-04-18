import React from 'react';
import WebView from 'react-native-webview';
import { StyleSheet, SafeAreaView } from 'react-native';

const KYCWeb = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        // originWhitelist={['file://']}
        source={{
          uri: 'https://postident.deutschepost.de/user/start/?caseId=CHZFTTXRA0G5',
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KYCWeb;
