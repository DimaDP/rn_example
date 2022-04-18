import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import TextBold from '../../../components/TextWrappers/TextBold';
import { COLORS } from '../../../constants/colors';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import ButtonShared from '../../../components/ButtonShared';
import CheckIcon from '../../../assets/icons/checked.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getKycDocs } from '../../../store/actions/kyc';

const Step3 = ({ setCurrentStep }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();
  const { currentTransactionId } = useSelector(store => store.kyc);

  const handleNext = () => {
    if (currentTransactionId) {
      dispatch(getKycDocs(currentTransactionId));
    }
    setCurrentStep(4);
  };
  const handlePrevious = () => setCurrentStep(2);
  const handleConfirm = () => setIsConfirmed(!isConfirmed);

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <TextBold style={styles.heading}>
          Verwahrung der digitalen Wertpapiere
        </TextBold>
        <TextBold style={styles.headingSmall}>Tangany GmbH</TextBold>
        <TextRegular style={styles.text}>
          Für die sichere Verwahrung Deiner GreenTech A Token benötigst Du ein
          Wallet. Ein Wallet ist ein digitales Schließfach, ähnlich einem
          Depotkonto, auf das Du jederzeit über unser Dashboard zugreifen
          kannst. Das Wallet stellen wir Dir kostenlos über unseren Partner, der
          Tangany GmbH aus München, zur Verfügung.
        </TextRegular>
        <View style={styles.wrapper}>
          <Pressable
            onPress={handleConfirm}
            hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: COLORS.activeColor,
                  backgroundColor: !isConfirmed
                    ? COLORS.inputBackground
                    : COLORS.activeColor,
                  width: 24,
                  height: 24,
                },
              ]}>
              {isConfirmed && <CheckIcon fill={COLORS.white} />}
            </View>
          </Pressable>
          <TextRegular style={{ ...styles.headingSmall, marginTop: 0 }}>
            Ich habe die AGB der Tangany GmbH gelesen und stimme diesen auch zu.
            Ich beauftrage inVenture ein kostenloses Wallet bei der Tangany GmbH
            für mich zu eröffnen.
          </TextRegular>
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <ButtonShared
          borderColor={COLORS.inActiveTabIcon}
          backGroundColor={COLORS.inActiveTabIcon}
          width={'48%'}
          onPress={handlePrevious}
          style={styles.button}>
          <TextBold style={styles.buttonText}>Zurück</TextBold>
        </ButtonShared>
        <ButtonShared
          width={'48%'}
          onPress={handleNext}
          style={styles.button}
          disabled={!isConfirmed}>
          <TextBold style={styles.buttonText}>Weiter</TextBold>
        </ButtonShared>
      </View>
    </View>
  );
};

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
  headingSmall: {
    fontSize: 12,
    marginTop: 10,
    color: COLORS.white,
    flex: 1,
  },
  text: {
    color: COLORS.darkTextColor,
    fontSize: 12,
    marginTop: 16,
    flexShrink: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  button: {
    margin: 0,
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
  wrapper: {
    flexDirection: 'row',
    paddingRight: 30,
    marginTop: 24,
  },
});

export default Step3;
