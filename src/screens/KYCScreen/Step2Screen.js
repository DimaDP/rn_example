import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import TextRegular from '../../components/TextWrappers/TextRegular';
import { COLORS } from '../../constants/colors';
import TextMedium from '../../components/TextWrappers/TextMedium';
import ButtonShared from '../../components/ButtonShared';
import TextBold from '../../components/TextWrappers/TextBold';

const countries = [
  { name: 'Ukraine', icon: '🇺🇦' },
  { name: 'Brazil', icon: '🇧🇷' },
  { name: ' United Kingdom', icon: '🇬🇧' },
];

const Step2Screen = ({ navigation }) => {
  const [value, setValue] = useState(null);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {countries.map(country => {
          const itemStyle =
            value !== country.name
              ? [styles.country]
              : [styles.country, styles.selectedStyle];
          return (
            <TouchableOpacity
              key={country.name}
              onPress={() => setValue(country.name)}>
              <View style={itemStyle}>
                <TextRegular style={styles.icon}>{country.icon} </TextRegular>
                <TextMedium style={styles.text}>{country.name}</TextMedium>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ButtonShared
        onPress={() => {
          navigation.navigate('Step 3');
        }}
        style={styles.button}>
        <TextBold
          style={{
            fontSize: 16,
            color: COLORS.white,
            textAlign: 'center',
          }}>
          SAVE
        </TextBold>
      </ButtonShared>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  country: {
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  selectedStyle: {
    backgroundColor: 'rgba(91, 125, 243, 0.15)',
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
  },
  button: {
    marginTop: 20,
    marginBottom: 50,
    width: Dimensions.get('screen').width - 32,
  },
});

export default Step2Screen;
