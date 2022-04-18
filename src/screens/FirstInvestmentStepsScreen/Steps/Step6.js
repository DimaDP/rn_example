import React, { Fragment, useState } from 'react';
import {
  Linking,
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
import InfoIcon from '../../../assets/icons/info.svg';
import { dispatch } from '../../../../index';
import { confirmTransaction } from '../../../store/actions/kyc';
import Loader from '../../../components/Loader/Loader';
import TextMedium from '../../../components/TextWrappers/TextMedium';
import PassportIcon from '../../../assets/icons/bx_id-card.svg';
import ClockIcon from '../../../assets/icons/gg_sand-clock.svg';
import PhoneIcon from '../../../assets/icons/cil_mobile.svg';
import { checkAuth } from '../../../store/actions/authorization';
import { useNavigation } from '@react-navigation/native';

const Step6 = ({ setCurrentStep }) => {
  const navigation = useNavigation();

  const [isOpenedPdfSlider, setIsOpenedPdfSlider] = useState(false);
  const [selectedDocument, setSSelectedDocument] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { documents, currentTransactionId, loading, redirectUrlWeb } =
    useSelector(store => store.kyc);

  const handleNext = async () => {
    await dispatch(confirmTransaction(currentTransactionId));
    await dispatch(checkAuth());
    setIsConfirmed(true);
  };
  const handlePrevious = () => setCurrentStep(5);
  const handleOpenSlider = item => () => {
    setSSelectedDocument(item);
    setIsOpenedPdfSlider(!isOpenedPdfSlider);
  };
  const handleCloseSlider = () => setIsOpenedPdfSlider(false);

  const goToPostIndent = () => {
    if (redirectUrlWeb) {
      Linking.canOpenURL(redirectUrlWeb).then(supported => {
        if (supported) {
          Linking.openURL(redirectUrlWeb);
        } else {
          console.log("Don't know how to open URI: " + redirectUrlWeb);
        }
      });
    }
    navigation.navigate('Home');
  };

  if (loading) {
    return <Loader />;
  }

  return !isConfirmed ? (
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

        <View style={styles.message}>
          <TextBold
            style={{
              ...styles.heading,
              textTransform: 'uppercase',
              marginBottom: 10,
            }}>
            <InfoIcon />
            {'  '}
            Vielen Dank für Dein Vertrauen.
          </TextBold>
          <TextRegular style={styles.name}>
            {' '}
            Wir prüfen nun deine Investition. Innerhalb der nächsten Tage
            erhältst du eine E-Mail mit einem Link zu den Zahlungsdetails von
            uns.
          </TextRegular>
          <TextRegular style={styles.name}>
            Den Status Deiner Investition kannst Du jederzeit bequem unter
            Investitionen in Deinem Dashboard einsehen.
          </TextRegular>
        </View>

        <TextBold style={styles.heading}>Documents:</TextBold>
        {documents &&
          documents.map(item => (
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
          <TextBold style={styles.buttonText}>Speichern</TextBold>
        </ButtonShared>
      </View>
    </View>
  ) : (
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
        <TextBold style={styles.heading}>Verifikation</TextBold>

        <TextRegular style={{ ...styles.text, lineHeight: 20 }}>
          Bevor Du bei investieren möchten Wir Deine verifizieren. Du gelangst
          über den gelben Button zur Seite der Deutschen post, wo Du über einen
          Video Chat Deine Oaten verifizierst
        </TextRegular>

        <View style={styles.wrapperIndent}>
          <PassportIcon style={styles.icon} />
          <TextMedium style={styles.headingSmall}>
            Du benötigst Das Ausweisdokument, welches Du in Schritt 4
            (Ausweisdaten) angegeben hast
          </TextMedium>
        </View>
        <View style={styles.wrapperIndent}>
          <ClockIcon style={styles.icon} />
          <TextMedium style={styles.headingSmall}>
            Du benötigst Das Ausweisdokument, welches Du in Schritt 4
            (Ausweisdaten) angegeben hast
          </TextMedium>
        </View>
        <View style={styles.wrapperIndent}>
          <PhoneIcon style={styles.icon} />
          <TextMedium style={styles.headingSmall}>
            Du benötigst Das Ausweisdokument, welches Du in Schritt 4
            (Ausweisdaten) angegeben hast
          </TextMedium>
        </View>
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
          onPress={goToPostIndent}
          style={styles.button}>
          <TextBold style={styles.buttonText}>Zur Postident</TextBold>
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
    marginVertical: 13,
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
  message: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  wrapperIndent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  icon: {
    marginRight: 12,
  },
});

export default Step6;
