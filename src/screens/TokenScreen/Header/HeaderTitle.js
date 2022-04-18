import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import { COLORS } from '../../../constants/colors';
import I18n from 'i18n-js';

const HeaderTitle = ({ route }) => {
  const { id, iconUrl } = route.params;
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: iconUrl,
        }}
      />
      <TextRegular style={styles.name}>
        {I18n.t('TOKEN')} {id}
      </TextRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  logo: {
    width: 16,
    height: 22,
  },
  name: {
    fontSize: 17,
    color: COLORS.white,
    marginLeft: 10,
  },
});

export default HeaderTitle;
