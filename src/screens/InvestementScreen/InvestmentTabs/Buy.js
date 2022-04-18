import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import styles from './TabsStyles';
import TextBold from '../../../components/TextWrappers/TextBold';
import { COLORS } from '../../../constants/colors';
import TextLight from '../../../components/TextWrappers/TextLight';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/icons/input_logo.svg';

const Buy = ({ amount, setAmount }) => {
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
      <TextBold style={styles.heading}>Your invesment</TextBold>

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
        <LinearGradient
          useAngle={true}
          angle={270}
          colors={['#43EDB0', '#43EDB0']}
          style={[styles.progressOwn, { width: 20, left: '63%' }]}
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
          value={amount}
          onChangeText={text => setAmount(text.replace(/[^0-9]/g, ''))}
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

export default Buy;
