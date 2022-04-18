import React, { Fragment, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TextBold from '../../../components/TextWrappers/TextBold';
import { COLORS } from '../../../constants/colors';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import ButtonShared from '../../../components/ButtonShared';
import { useSelector } from 'react-redux';
import DocIcon from '../../../assets/icons/document.svg';
import MenuIcon from '../../../assets/icons/more-vert.svg';
import PdfSlider from '../PdfModal/PdfSlider';
import CheckIcon from '../../../assets/icons/checked.svg';

const Step5 = ({ setCurrentStep }) => {
  const [isOpenedPdfSlider, setIsOpenedPdfSlider] = useState(false);
  const [selectedDocument, setSSelectedDocument] = useState(null);

  const { documents } = useSelector(store => store.kyc);
  const { tokenById } = useSelector(store => store.tokens);

  const filteredDocs = useMemo(() => {
    return documents?.filter(item => item.name !== 'Kosten und Zuwendungen');
  }, [documents]);

  const handleNext = () => setCurrentStep(6);
  const handlePrevious = () => setCurrentStep(4);
  const handleOpenSlider = item => () => {
    setSSelectedDocument(item);
    setIsOpenedPdfSlider(!isOpenedPdfSlider);
  };
  const handleCloseSlider = () => setIsOpenedPdfSlider(false);

  return (
    <View style={styles.outerContainer}>
      {selectedDocument && (
        <PdfSlider
          isOpen={isOpenedPdfSlider}
          item={selectedDocument}
          onClose={handleCloseSlider}
          handleSubmit={() => {}}
        />
      )}
      <ScrollView style={styles.container}>
        <TextBold style={styles.heading}>
          Zusammenfassung Deines Investitionsangebotes
        </TextBold>
        <View style={styles.transaction}>
          <View style={styles.headingWrapper}>
            <TextBold style={styles.name}>Token {tokenById.id}</TextBold>
            <TextBold style={{ fontSize: 12, color: COLORS.darkTextColor }}>
              Tokenisierte Schuldverschreibung
            </TextBold>
          </View>
          <View
            style={[styles.divider, { backgroundColor: COLORS.transparent }]}
          />

          <View style={styles.headingWrapper}>
            <TextRegular style={styles.investition}>
              Investitionsbetrag
            </TextRegular>
            <TextBold style={{ fontSize: 14, color: COLORS.white }}>
              € 1.000
            </TextBold>
          </View>
          <View style={styles.divider} />

          <View style={styles.headingWrapper}>
            <TextRegular style={styles.investition}>
              Zu zahlender Betrag
            </TextRegular>
            <TextBold style={{ fontSize: 14, color: COLORS.white }}>
              € 1.000
            </TextBold>
          </View>
          <View style={styles.divider} />
        </View>
        <TextBold style={styles.heading}>Empfangsbestätigung</TextBold>
        <TextRegular style={styles.text}>
          Hiermit bestätige ich, folgende Unterlagen rechtzeitig vor Abgabe
          dieser Zeichnungserklärung entweder in elektronischer Form zugesandt
          bekommen, heruntergeladen oder ausgedruckt habe und diese gelesen und
          verstanden habe:
        </TextRegular>
        {documents &&
          filteredDocs.map(item => (
            <Fragment key={item.name}>
              {/*<View style={styles.wrapperCheckbox}>*/}
              {/*  <Pressable*/}
              {/*    onPress={handleConfirm}*/}
              {/*    hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>*/}
              {/*    <View*/}
              {/*      style={[*/}
              {/*        styles.checkbox,*/}
              {/*        {*/}
              {/*          borderColor: COLORS.activeColor,*/}
              {/*          backgroundColor: !isConfirmed*/}
              {/*            ? COLORS.inputBackground*/}
              {/*            : COLORS.activeColor,*/}
              {/*          width: 24,*/}
              {/*          height: 24,*/}
              {/*        },*/}
              {/*      ]}>*/}
              {/*      {isConfirmed && <CheckIcon fill={COLORS.white} />}*/}
              {/*    </View>*/}
              {/*  </Pressable>*/}
              {/*  <TextRegular style={{ ...styles.headingSmall, marginTop: 0 }}>*/}
              {/*    Ich habe die AGB der Tangany GmbH gelesen und stimme diesen auch zu.*/}
              {/*    Ich beauftrage inVenture ein kostenloses Wallet bei der Tangany GmbH*/}
              {/*    für mich zu eröffnen.*/}
              {/*  </TextRegular>*/}
              {/*</View>*/}
              <View style={styles.document}>
                <View style={styles.iconWrapper}>
                  <DocIcon />
                </View>
                <View style={styles.header}>
                  <TextRegular style={styles.headingDoc}>Document:</TextRegular>
                  <TextRegular style={styles.name}>{item.name}</TextRegular>
                </View>
                <TouchableOpacity
                  style={styles.menu}
                  onPress={handleOpenSlider(item)}>
                  <MenuIcon />
                </TouchableOpacity>
              </View>
            </Fragment>
          ))}
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
        <ButtonShared width={'58%'} onPress={handleNext} style={styles.button}>
          <TextBold style={styles.buttonText}>
            ZAHLUNGSPFLICHTIG INVESTIEREN
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
  wrapperCheckbox: {
    flexDirection: 'row',
    paddingRight: 30,
    marginTop: 24,
  },
  headingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transaction: {
    marginVertical: 20,
  },
  investition: {
    fontSize: 14,
    color: COLORS.darkTextColor,
  },
  divider: {
    height: 2,
    marginVertical: 10,
    backgroundColor: COLORS.favoriteButtonColor,
  },
});

export default Step5;
