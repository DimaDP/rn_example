import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextBold from '../../../components/TextWrappers/TextBold';
import { COLORS } from '../../../constants/colors';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import ButtonShared from '../../../components/ButtonShared';
import { useSelector } from 'react-redux';
import DocIcon from '../../../assets/icons/document.svg';
import MenuIcon from '../../../assets/icons/more-vert.svg';
import PdfSlider from '../PdfModal/PdfSlider';

const Step4 = ({ setCurrentStep }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isOpenedPdfSlider, setIsOpenedPdfSlider] = useState(false);

  const { documents } = useSelector(store => store.kyc);

  const kosten = useMemo(() => {
    return documents?.find(doc => doc.name === 'Kosten und Zuwendungen');
  }, [documents]);

  const handleNext = () => setCurrentStep(5);
  const handlePrevious = () => setCurrentStep(3);
  const handleConfirm = () => setIsConfirmed(true);
  const handleOpenSlider = () => setIsOpenedPdfSlider(!isOpenedPdfSlider);

  return (
    <View style={styles.outerContainer}>
      {kosten && (
        <PdfSlider
          isOpen={isOpenedPdfSlider}
          item={kosten}
          onClose={handleOpenSlider}
          handleSubmit={handleConfirm}
        />
      )}
      <ScrollView style={styles.container}>
        <TextBold style={styles.heading}>
          Übersicht der Kosten und Zuwendungen
        </TextBold>
        <TextRegular style={styles.text}>
          Im Rahmen dieser Emission entstehen Kosten für den Vertrieb, Marketing
          und die rechtliche Strukturierung des Produktes. Wir sind nach § 63
          Abs. 7 WpHG gesetzlich verpflichtet, Dir diese Kosten in Form einer
          Tabelle transparent darzustellen.
        </TextRegular>
        {kosten && (
          <View style={styles.document} onPress={() => {}}>
            <View style={styles.iconWrapper}>
              <DocIcon />
            </View>
            <View style={styles.header}>
              <TextRegular style={styles.headingDoc}>Document:</TextRegular>
              <TextRegular style={styles.name}>{kosten.name}</TextRegular>
            </View>
            <TouchableOpacity style={styles.menu} onPress={handleOpenSlider}>
              <MenuIcon />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <View style={styles.buttons}>
        <ButtonShared
          borderColor={COLORS.inActiveTabIcon}
          backGroundColor={COLORS.inActiveTabIcon}
          width={'38%'}
          onPress={handlePrevious}
          style={styles.button}>
          <TextBold style={styles.buttonText}>Zurück</TextBold>
        </ButtonShared>
        <ButtonShared
          width={'58%'}
          onPress={handleNext}
          style={styles.button}
          disabled={!isConfirmed}>
          <TextBold style={styles.buttonText}>
            Zur Kosten und Zuwendungen
          </TextBold>
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
    textAlign: 'center',
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
  document: {
    flexDirection: 'row',
    marginBottom: 24,
    marginTop: 20,
  },
  name: {
    color: COLORS.white,
    fontSize: 14,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderRadius: 4,
  },
  headingDoc: {
    color: COLORS.darkTextColor,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  header: {
    justifyContent: 'center',
  },
  menu: {
    borderColor: COLORS.inActiveTabIcon,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default Step4;
