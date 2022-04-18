import React, { useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import TextBold from '../../../components/TextWrappers/TextBold';
import { COLORS } from '../../../constants/colors';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import FKInput from '../../../components/FKInput/FKInput';
import { useSelector } from 'react-redux';
import TextMedium from '../../../components/TextWrappers/TextMedium';
import CheckIcon from '../../../assets/icons/checked.svg';
import ButtonShared from '../../../components/ButtonShared';
import EuroIcon from '../../../assets/icons/euro.svg';

const reg = new RegExp(/(?=(\d{3})+(?!\d))/, 'g');

const InvestmentData = ({ setCurrentStep, amount, setAmount }) => {
  const [firstConfirm, setFirstConfirm] = useState(false);
  const [secondConfirm, setSecondConfirm] = useState(false);

  const {
    tokenById: { id },
  } = useSelector(store => store.tokens);

  const handleAmount = (_, text) => {
    const value = text
      .replace(/[^\d]/g, '')
      .replace(reg, '.')
      .replace(/^\./g, '')
      .replace(/^0/, '');
    setAmount(value);
  };

  const onSubmit = () => {
    setCurrentStep(2);
  };

  const disabled =
    !firstConfirm || !secondConfirm || +amount.replace(/\./g, '') < 1000;

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}>
        <TextBold style={styles.heading}>
          Investitionsdaten zum “Token {id}”
        </TextBold>
        <TextRegular style={styles.text}>
          Wähle den Betrag aus, den Du investieren möchtest.
        </TextRegular>
        <TextRegular style={styles.text}>
          Der Investitionsbetrag muss zwischen 1,000€ und 25,000€ liegen und
          durch 100 teilbar sein.
        </TextRegular>
        <TextRegular style={styles.label}>Amount</TextRegular>
        <View style={styles.input}>
          <FKInput
            value={amount}
            handleChange={handleAmount}
            style={{ paddingLeft: 28 }}
          />
          <EuroIcon style={styles.icon} height={16} width={12} />
        </View>
        <View style={styles.spacer} />
        <View style={styles.wrapper}>
          <TextMedium style={styles.underscored}>Gutschein einlösen</TextMedium>
        </View>
        <TextBold style={styles.heading}>Selbstauskunft</TextBold>
        <TextRegular style={styles.text}>
          Bei dieser Kapitalanlage ist die Höhe der Investitionssumme beschränkt
          und an bestimmte
        </TextRegular>
        <TextRegular style={styles.text}>
          Voraussetzungen gebunden. Das Wertpapierprospektgesetz schreibt in
          diesem Fall vor, Deine Selbstauskunft einzuholen.
        </TextRegular>
        <TextRegular style={styles.text}>
          Eine Investition über 1,000 Euro ist nur möglich, wenn Du zum
          Zeitpunkt der Zeichnung mindestens eine der beiden folgenden Aussagen
          bestätigen kannst:
        </TextRegular>
        <View style={styles.checkboxWrapper}>
          <Pressable
            onPress={() => setFirstConfirm(!firstConfirm)}
            hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: COLORS.activeColor,
                  backgroundColor: !firstConfirm
                    ? COLORS.inputBackground
                    : COLORS.activeColor,
                },
              ]}>
              {firstConfirm && <CheckIcon fill={COLORS.white} />}
            </View>
          </Pressable>
          <TextRegular style={styles.options}>
            Ich bestätige, dass der Investitionsbetrag von 1,000€ nicht das
            Zweifache meines durchschnittlichen monatlichen Netto-Einkommens
            übersteigt.
          </TextRegular>
        </View>

        <View style={styles.checkboxWrapper}>
          <Pressable
            onPress={() => setSecondConfirm(!secondConfirm)}
            hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: COLORS.activeColor,
                  backgroundColor: !secondConfirm
                    ? COLORS.inputBackground
                    : COLORS.activeColor,
                },
              ]}>
              {secondConfirm && <CheckIcon fill={COLORS.white} />}
            </View>
          </Pressable>
          <TextRegular style={styles.options}>
            Ich bestätige, dass ich über ein frei verfügbares Vermögen in Form
            von Bankguthaben und Finanzinstrumenten von mindestens 100,000€
            verfüge.
          </TextRegular>
        </View>
      </ScrollView>
      <ButtonShared
        onPress={onSubmit}
        style={styles.button}
        disabled={disabled}>
        <TextBold style={styles.buttonText}>Weiter</TextBold>
      </ButtonShared>
    </View>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: 'flex-start',
  },
  text: {
    color: COLORS.darkTextColor,
    fontSize: 12,
    marginTop: 16,
    flexShrink: 1,
  },
  label: {
    marginLeft: 10,
    marginTop: 16,
    fontSize: 12,
    color: COLORS.white,
  },
  spacer: {
    width,
    backgroundColor: COLORS.dividerColor,
    height: 2,
    marginLeft: -16,
  },
  wrapper: {
    alignSelf: 'flex-start',
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  underscored: {
    marginTop: 16,
    fontSize: 14,
    color: COLORS.white,
    includeFontPadding: false,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    marginTop: 16,
  },
  checkbox: {
    backgroundColor: COLORS.inputBackground,
    width: 24,
    height: 24,
    borderRadius: 2,
    overflow: 'hidden',

    borderColor: COLORS.linkColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  options: {
    fontSize: 14,
    color: COLORS.white,
    lineHeight: 20,
    flexShrink: 1,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  button: {
    width: width - 32,
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  input: {
    position: 'relative',
  },
});

export default InvestmentData;
