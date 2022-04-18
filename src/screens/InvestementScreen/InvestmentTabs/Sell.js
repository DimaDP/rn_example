import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import styles from './TabsStyles';
import TextBold from '../../../components/TextWrappers/TextBold';
import { COLORS } from '../../../constants/colors';
import TextLight from '../../../components/TextWrappers/TextLight';
import Logo from '../../../assets/icons/input_logo.svg';

const Sell = ({ amount, setAmount }) => {
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
      <TextBold style={styles.heading}>Balance</TextBold>

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
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Your Investment:</TextLight>
            <TextBold style={styles.propsValue}>
              <Logo /> {'  '}326
            </TextBold>
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

      <TextBold style={styles.heading}>Calculate profit</TextBold>
      <View style={styles.inputContainer}>
        <TextInput
          onFocus={() => handleInputFocus('password')}
          onBlur={() => handleInputBlur('password')}
          onChangeText={text => setAmount(text.replace(/[^0-9]/g, ''))}
          selectionColor={COLORS.white}
          value={amount}
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
    </View>
  );
};

export default Sell;
