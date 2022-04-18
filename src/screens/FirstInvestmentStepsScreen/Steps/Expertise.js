import React, { Fragment, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import TextBold from '../../../components/TextWrappers/TextBold';
import { useDispatch, useSelector } from 'react-redux';
import I18n from 'i18n-js';
import CheckIcon from '../../../assets/icons/checked.svg';
import FKSelect from '../../../components/FKSelect/FKSelect';
import {
  postUserExperience,
  setUserExperience,
} from '../../../store/actions/kyc';
import ButtonShared from '../../../components/ButtonShared';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Loader from '../../../components/Loader/Loader';

const LABELS1 = [
  'Wie viel Erfahrung hast Du mit der Investition in\n' +
    'Wertpapiere über eine Anlageberatung?',
  'Wie viel Erfahrung hast Du mit der Investition in\n' +
    'Wertpapiere über eine Vermögensberatung?',
  'Wie viel Erfahrung hast Du mit der\n' +
    'eigenständigen, beratungsfreien Investition in\n' +
    'Wertpapiere?',
];

const LABELS2 = [
  'Wie viele Investitionen tätigst Du pro Jahr?',
  'Wie hoch ist der durchschnittliche Gegenwert der' +
    'Transaktionen aus der vorherigen Frage?',
];

const Expertise = ({ setCurrentStep, amount }) => {
  const { userExperience, loading } = useSelector(store => store.kyc);
  const [openedPicker, setOpenedPicker] = useState('');
  const [isSubmitInfo, setSubmitInfo] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();

  const onOpen = itemName => () => {
    itemName === openedPicker ? setOpenedPicker('') : setOpenedPicker(itemName);
  };

  const setValues = (_, list) => {
    dispatch(setUserExperience([_, list]));
  };

  const setSubmitInfoCheckbox = () => setSubmitInfo(!isSubmitInfo);

  const handleBack = () => setCurrentStep(1);

  const setChecked = (label, item) => () => {
    const mapped = item[1].map(option => ({
      ...option,
      hasKnowledge: !option.hasKnowledge,
    }));
    dispatch(setUserExperience([label, mapped]));
  };

  const handleConfirm = async () => {
    await dispatch(
      postUserExperience({
        ...userExperience,
        amount,
      }),
    );
    setCurrentStep(3);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.containerOuter}>
      <ConfirmModal
        isVisible={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        setCurrentStep={setCurrentStep}
        handleConfirm={handleConfirm}
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 300 }}>
        <TextBold style={styles.heading}>Kenntnisse und Erfahrungen</TextBold>
        <TextRegular style={styles.text}>
          Gemäß Wertpapierhandelsgesetz (§ 63 Abs. 5 WpHG) sind wir
          verpflichtet, Deine Kenntnisse und Erfahrungen bezüglich verschiedener
          Produktklassen wie Wertpapieren, Vermögensanlagen und sonstigen
          Kapitalmarktprodukten abzufragen.
        </TextRegular>
        <TextRegular style={styles.text}>
          Mittels der Antworten können wir für Dich prüfen, ob die Zeichnung
          dieser Kapitalanlage Deinen Kenntnissen und Erfahrungen aus Deinem
          bisherigen Anlageverhalten entspricht. Die Beantwortung dieser Fragen
          ist jedoch freiwillig. Machst Du keine oder unvollständige Angaben,
          können wir die Angemessenheit des jeweiligen Kapitalmarktproduktes
          nicht für Dich prüfen. Daher solltest Du aus eigenem Interesse Angaben
          machen.
        </TextRegular>
        <View style={[styles.selectors, { zIndex: 10 }]}>
          <TextBold style={styles.headingSmall}>
            Erfahrungen mit Kapitalmarktprodukten
          </TextBold>
          <View style={styles.labels}>
            {userExperience &&
              userExperience.slice(0, 7).map((item, idx) => {
                return (
                  <View
                    style={{
                      ...styles.experienceItem,
                      zIndex: (7 - idx) * 1000,
                    }}
                    key={item[0]}>
                    <TextRegular style={styles.name}>
                      {I18n.t(item[0])}
                    </TextRegular>

                    <View style={styles.checkboxWrapper}>
                      <Pressable
                        onPress={setChecked(item[0], item)}
                        hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                        <View
                          style={[
                            styles.checkbox,
                            {
                              borderColor: COLORS.activeColor,
                              backgroundColor: !item[1][0].hasKnowledge
                                ? COLORS.inputBackground
                                : COLORS.activeColor,
                            },
                          ]}>
                          {item[1][0].hasKnowledge && (
                            <CheckIcon fill={COLORS.white} />
                          )}
                        </View>
                      </Pressable>
                    </View>

                    <View
                      style={{
                        ...styles.selectorWrapper,
                      }}>
                      <FKSelect
                        label={item[0]}
                        open={item[0] === openedPicker}
                        onOpen={onOpen(item[0])}
                        dropDownDirection={'BOTTOM'}
                        error={null}
                        itemsList={item[1]}
                        selectedItem={
                          item[1].find(option => {
                            return option.selected;
                          })?.value || ''
                        }
                        handleChange={setValues}
                        style={{ backgroundColor: COLORS.mainBackground }}
                      />
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
        <View style={[styles.selectors, { zIndex: 9 }]}>
          <TextBold style={styles.headingSmall}>
            Erfahrungen mit Wertpapierdienstleistung
          </TextBold>
          {userExperience &&
            userExperience.slice(7, 10).map((option, idx) => {
              return (
                <Fragment key={option[0]}>
                  <TextRegular style={styles.label}>{LABELS1[idx]}</TextRegular>
                  <FKSelect
                    label={option[0]}
                    open={option[0] === openedPicker}
                    onOpen={onOpen(option[0])}
                    dropDownDirection={'BOTTOM'}
                    error={null}
                    itemsList={option[1]}
                    selectedItem={
                      option[1].find(option => option.selected)?.value || ''
                    }
                    handleChange={setValues}
                    style={{ backgroundColor: COLORS.mainBackground }}
                  />
                </Fragment>
              );
            })}
        </View>

        <View style={[styles.selectors, { zIndex: 8 }]}>
          <TextBold style={styles.headingSmall}>
            Erfahrungen mit Wertpapierdienstleistung
          </TextBold>
          {userExperience &&
            userExperience.slice(10).map((option, idx) => {
              return (
                <Fragment key={option[0]}>
                  <TextRegular style={styles.label}>{LABELS2[idx]}</TextRegular>
                  <FKSelect
                    label={option[0]}
                    open={option[0] === openedPicker}
                    onOpen={onOpen(option[0])}
                    dropDownDirection={'BOTTOM'}
                    error={null}
                    itemsList={option[1]}
                    selectedItem={
                      option[1].find(option => option.selected)?.value || ''
                    }
                    handleChange={setValues}
                    style={{ backgroundColor: COLORS.mainBackground }}
                  />
                </Fragment>
              );
            })}
        </View>
        <View style={styles.wrapper}>
          <Pressable
            onPress={setSubmitInfoCheckbox}
            hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: COLORS.activeColor,
                  backgroundColor: !isSubmitInfo
                    ? COLORS.inputBackground
                    : COLORS.activeColor,
                  width: 24,
                  height: 24,
                },
              ]}>
              {isSubmitInfo && <CheckIcon fill={COLORS.white} />}
            </View>
          </Pressable>
          <TextRegular style={styles.headingSmall}>
            Ich möchte keine Angaben machen.
          </TextRegular>
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <ButtonShared
          borderColor={COLORS.inActiveTabIcon}
          backGroundColor={COLORS.inActiveTabIcon}
          width={'48%'}
          onPress={handleBack}
          style={styles.button}>
          <TextBold style={styles.buttonText}>Zurück</TextBold>
        </ButtonShared>
        <ButtonShared
          width={'48%'}
          onPress={() => setIsOpenModal(true)}
          style={styles.button}>
          <TextBold style={styles.buttonText}>BESTÄTIGEN</TextBold>
        </ButtonShared>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerOuter: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: 'flex-start',
  },
  headingSmall: {
    fontSize: 14,
    color: COLORS.white,
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
    marginBottom: 5,
    fontSize: 12,
    color: COLORS.white,
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
    marginVertical: 0,
  },
  selectors: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 6,
    padding: 10,
    marginVertical: 8,
  },
  experienceItem: {
    flexDirection: 'row',
    marginBottom: 10,
    height: 50,
    alignItems: 'center',
  },
  name: {
    flex: 1.3,
    color: COLORS.white,
    fontSize: 14,
  },
  checkboxWrapper: {
    flex: 0.3,
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: COLORS.inputBackground,
    width: 20,
    height: 20,
    borderRadius: 2,
    overflow: 'hidden',

    borderColor: COLORS.linkColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectorWrapper: {
    flex: 1.2,
    alignItems: 'center',
  },
  labels: {
    paddingTop: 16,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

export default Expertise;
