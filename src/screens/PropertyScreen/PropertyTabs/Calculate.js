import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import TextBold from '../../../components/TextWrappers/TextBold';
import { COLORS } from '../../../constants/colors';
import TextLight from '../../../components/TextWrappers/TextLight';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/icons/input_logo.svg';

const Calculate = () => {
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const handleInputFocus = textinput => {
    setIsFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = textinput => {
    setIsFocused({
      [textinput]: false,
    });
  };

  return (
    <View style={styles.container}>
      <TextBold style={styles.heading}>Property Highlights</TextBold>
      <View style={styles.props}>
        <View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Expected Yield:</TextLight>
            <TextBold style={styles.propsValue}>11.67 %</TextBold>
          </View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Rent per token:</TextLight>
            <TextBold style={styles.propsValue}>€ 6.06/year</TextBold>
          </View>
        </View>

        <View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Token price:</TextLight>
            <TextBold style={styles.propsValue}>€ 51.97</TextBold>
          </View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Total tokens:</TextLight>
            <TextBold style={styles.propsValue}>6.500</TextBold>
          </View>
        </View>
      </View>
      <TextBold style={styles.heading}>Calculate</TextBold>

      <View style={styles.props}>
        <View>
          <View style={styles.propsUnit}>
            <TextBold style={styles.calculateValue}>63 %</TextBold>
            <TextLight style={styles.calculateText}>funded</TextLight>
          </View>
        </View>

        <View>
          <View style={styles.propsUnit}>
            <TextBold style={styles.calculateValue}>€ 234.00</TextBold>
            <TextLight style={styles.calculateText}>available</TextLight>
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <LinearGradient
          useAngle={true}
          angle={270}
          colors={['#5B7DF3', '#99CEFF']}
          style={styles.progress}
        />
      </View>

      <View style={styles.props}>
        <View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Interest rate:</TextLight>
            <TextBold style={styles.propsValue}>13% + 3%</TextBold>
          </View>
        </View>

        <View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Duration:</TextLight>
            <TextBold style={styles.propsValue}>6 months</TextBold>
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          onFocus={() => handleInputFocus('password')}
          onBlur={() => handleInputBlur('password')}
          selectionColor='white'
          placeholderTextColor={COLORS.white}
          keyboardType='default'
          style={[
            styles.input,
            {
              borderWidth: 1,
              paddingLeft: 40,
              borderColor: isFocused.password
                ? COLORS.linkColor
                : COLORS.transparent,
            },
          ]}
        />
        <Logo style={styles.logo} />
      </View>

      <View style={styles.props}>
        <View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Share price:</TextLight>
            <TextBold style={styles.propsValue}>13% + 3%</TextBold>
          </View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Shares:</TextLight>
            <TextBold style={styles.propsValue}>€ 6.06/year</TextBold>
          </View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Total:</TextLight>
            <TextBold style={styles.propsValue}>€ 12</TextBold>
          </View>
        </View>

        <View style={{ justifyContent: 'center' }}>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Investment:</TextLight>
            <TextBold style={styles.propsValue}>€ 51.97</TextBold>
          </View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Total:</TextLight>
            <TextBold style={styles.propsValue}>6 months</TextBold>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 16,
  },
  props: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  propsUnit: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'baseline',
  },
  propsText: {
    color: COLORS.darkTextColor,
    fontSize: 11,
  },
  propsValue: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 8,
  },
  aboutText: {
    color: COLORS.white,
    marginTop: 10,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    borderRadius: 6,
    backgroundColor: COLORS.inputBackground,
    marginTop: 10,
  },
  progress: {
    width: '63%',
    height: 8,
    borderRadius: 6,
    position: 'absolute',
    top: 0,
  },
  calculateValue: {
    color: COLORS.white,
    fontSize: 12,
  },
  calculateText: {
    fontSize: 10,
    marginLeft: 8,
    color: COLORS.darkTextColor,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.white,
    fontSize: 16,
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  logo: {
    position: 'absolute',
    top: 12,
    left: 15,
  },
  inputContainer: {
    height: 42,
    marginVertical: 16,
  },
});

export default Calculate;
