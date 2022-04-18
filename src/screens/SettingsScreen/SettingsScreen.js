import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import TextRegular from '../../components/TextWrappers/TextRegular';
import { COLORS } from '../../constants/colors';
import SettingsItem from './SettingsItem/SettingsItem';

const SETTINGS_TABS = [
  {
    name: 'account',
    route: 'Account',
  },
  { name: 'security', route: 'ChangePasswordScreen' },
  // { name: 'payments', route: 'payments' },
  { name: 'support', route: 'support' },
  // { name: 'my documents', route: 'my documents' },
  { name: 'FAQ', route: 'FAQScreen' },
  // { name: 'language', route: 'language' },
  { name: 'about', route: 'about' },
  { name: 'rate the app', route: 'rate the app' },
  { name: 'terms and service', route: 'TermsScreen' },
  { name: 'logout', route: 'logout' },
];

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInner}>
        <TextRegular style={styles.heading}>Settings</TextRegular>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}>
          {SETTINGS_TABS.map(item => {
            return <SettingsItem key={item.name} item={item} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 17,
    color: COLORS.white,
    marginBottom: 20,
  },
  contentContainerStyle: {
    paddingBottom: 70,
  },
});

export default SettingsScreen;
