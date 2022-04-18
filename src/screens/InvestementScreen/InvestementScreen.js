import React, { useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles, tabWidth } from './InvestementScreenStyles';
import TokenCard from '../../components/TokenCard/TokenCard';
import TextBold from '../../components/TextWrappers/TextBold';
import Buy from './InvestmentTabs/Buy';
import Sell from './InvestmentTabs/Sell';
import ButtonShared from '../../components/ButtonShared';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import { useSelector } from 'react-redux';

const InvestmentScreen = ({ navigation, route }) => {
  const userTokens = useSelector(store => store.tokens.userTokens);
  const [currentTabName, setCurrentTabName] = useState('buy');
  const translateValue = useRef(new Animated.Value(0)).current;
  const [amount, setAmount] = useState();

  const selectTab = (tabName, index) => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
    setCurrentTabName(tabName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardWrapper style={{ paddingHorizontal: 0 }}>
        <ScrollView style={[styles.container, { paddingVertical: 20 }]}>
          <View style={{ paddingHorizontal: 16 }}>
            {userTokens
              ?.filter(token => token.id === route.params.id)
              .map(token => (
                <TokenCard key={token.id} token={token} />
              ))}
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => selectTab('buy', 0)}>
              <TextBold
                style={
                  currentTabName === 'buy'
                    ? styles.buttonText
                    : styles.buttonTextDisabled
                }>
                Buy
              </TextBold>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => selectTab('sell', 1)}>
              <TextBold
                style={
                  currentTabName === 'sell'
                    ? styles.buttonText
                    : styles.buttonTextDisabled
                }>
                Sell
              </TextBold>
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[
              styles.slider,
              {
                transform: [{ translateX: translateValue }],
                width: tabWidth,
              },
            ]}
          />
          {currentTabName === 'buy' && (
            <Buy setAmount={setAmount} amount={amount} />
          )}
          {currentTabName === 'sell' && (
            <Sell setAmount={setAmount} amount={amount} />
          )}
        </ScrollView>
        <ButtonShared
          style={
            currentTabName === 'buy'
              ? styles.buttonSubmitBuy
              : styles.buttonSubmitSell
          }
          onPress={() => {}}>
          <TextBold style={styles.buttonSubmitBuyText}>
            {currentTabName === 'buy' ? 'Buy more' : 'Sell'}
          </TextBold>
        </ButtonShared>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

export default InvestmentScreen;
