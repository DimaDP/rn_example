import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, View } from 'react-native';
import { styles } from './styles';
import { COLORS } from '../../constants/colors';
import TextBold from '../../components/TextWrappers/TextBold';
import TextRegular from '../../components/TextWrappers/TextRegular';
import FKInput from '../../components/FKInput/FKInput';
import { useFormik } from 'formik';
import ButtonShared from '../../components/ButtonShared';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRouterColor,
  setStatusBarColor,
} from '../../store/actions/statusBar';
import { useFocusEffect } from '@react-navigation/native';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import { validateNumber } from '../../utils/validators';
import CountryPicker from './CountryPicker/CountryPicker';
import { KYCFirstStep } from '../../store/actions/kyc';
import SuccessModal from './SuccessModal/SuccessModal';
import { checkAuth } from '../../store/actions/authorization';
import FKSelect from '../../components/FKSelect/FKSelect';
import FKDatePicker from '../../components/FKDatePicker/FKDatePicker';
import CheckIcon from '../../assets/icons/checked.svg';
import Loader from '../../components/Loader/Loader';

const KYCSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50),
  lastName: Yup.string().min(3).max(50),
  country: Yup.string(),
  city: Yup.string().min(3).max(50),
  street: Yup.string().min(3).max(50),
  apartment: Yup.string(),
  zipCode: Yup.string(),
});

const KYCScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { redirectUrlWeb, userKYCData, loading } = useSelector(
    store => store.kyc,
  );
  const {
    tokenById: { id, icon },
  } = useSelector(store => store.tokens);

  const { isEdit, tokenId, amount } = route.params;
  const [isPolitic, setIsPolitic] = useState(false);
  const [secondCheckbox, setSecondCheckbox] = useState(false);

  const [openedSelector, setOpenedSelector] = useState('');

  const onOpenSelector = itemName => () =>
    itemName === openedSelector
      ? setOpenedSelector('')
      : setOpenedSelector(itemName);

  const clearSelectedItem = () => setOpenedSelector('');

  useFocusEffect(
    useCallback(() => {
      dispatch(setStatusBarColor(COLORS.linkColor));
      dispatch(setRouterColor(COLORS.linkColor));
      return () => {
        dispatch(setStatusBarColor(COLORS.mainBackground));
        dispatch(setRouterColor(COLORS.mainBackground));
      };
    }, [dispatch]),
  );

  const { handleSubmit, values, errors, setFieldValue, setValues } = useFormik({
    validationSchema: KYCSchema,
    initialValues: {
      birthDate: '',
      citizenship: '',
      address: '',
      appendix: '',
      zipCode: '',
      city: '',
      country: '',
      placeOfBirth: '',
      idNumber: '',
      issuingAuthority: '',
      idIssuedOn: '',
      idValidUntil: '',
      idType: [],
      employmentType: [],
      educationLevel: [],
    },
    onSubmit: async personalData => {
      const userInfo = {
        ...userKYCData,
        ...personalData,
        idType: personalData.idType
          .filter(item => item.selected)
          .map(item => ({ selected: item.selected, value: item.value })),
        employmentType: personalData.employmentType
          .filter(item => item.selected)
          .map(item => ({ selected: item.selected, value: item.value })),
        educationLevel: personalData.educationLevel
          .filter(item => item.selected)
          .map(item => ({ selected: item.selected, value: item.value })),
      };
      for (let k in userInfo) {
        if (userInfo[k] === '') {
          userInfo[k] = null;
        }
      }
      if (!isEdit) {
        await dispatch(KYCFirstStep(userInfo, tokenId, amount));
        // await dispatch(checkAuth());
        navigation.navigate('FirstInvestmentStepsScreen', {
          id,
          iconUrl: icon,
        });
        // navigation.navigate('PDFScreen', { isEdit: false });
      } else {
        await dispatch(checkAuth());
        navigation.navigate('PDFScreen', { isEdit });
      }
    },
  });
  // console.log(errors, '\n', values);

  // useEffect(() => {
  //   if (redirectUrlWeb) {
  //     Linking.canOpenURL(redirectUrlWeb).then(supported => {
  //       if (supported) {
  //         Linking.openURL(redirectUrlWeb);
  //       } else {
  //         console.log("Don't know how to open URI: " + redirectUrlWeb);
  //       }
  //     });
  //     navigation.navigate('Home');
  //   }
  // }, [redirectUrlWeb]);

  useEffect(() => {
    if (userKYCData) {
      setValues({
        birthDate: userKYCData.birthDate || '',
        citizenship: userKYCData.citizenship || '',
        address: userKYCData.address || '',
        appendix: userKYCData.appendix || '',
        zipCode: userKYCData.zipCode?.toString() || '',
        city: userKYCData.city || '',
        country: userKYCData.country || '',
        placeOfBirth: userKYCData.placeOfBirth || '',
        idNumber: userKYCData.idNumber || '',
        issuingAuthority: userKYCData.issuingAuthority || '',
        idIssuedOn: userKYCData.idIssuedOn || '',
        idValidUntil: userKYCData.idValidUntil || '',
        idType: userKYCData.idType || [],
        employmentType: userKYCData.employmentType || [],
        educationLevel: userKYCData.educationLevel || [],
      });
    }
  }, []);

  const submitValues = async () => {
    await handleSubmit();
  };

  const topAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const handleCloseModal = () => {
    setIsOpenSuccessModal(false);
    navigation.navigate('Home');
  };

  useEffect(() => {
    Animated.timing(topAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [topAnim]);

  return (
    <View style={styles.container}>
      {loading && <Loader isModal />}
      <SuccessModal
        handleClose={handleCloseModal}
        isVisible={isOpenSuccessModal}
      />
      <Animated.View
        style={[
          styles.innerContainer,
          { transform: [{ translateY: topAnim }] },
        ]}>
        <KeyboardWrapper>
          <View style={{ height: 20 }} />
          <TextBold style={styles.paragraph}>Adressdaten</TextBold>
          <TextRegular style={styles.label}>Land</TextRegular>
          <FKInput
            clearSelectedItem={clearSelectedItem}
            value={values.country}
            label={'country'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.country}
          />
          <TextRegular style={styles.label}>Str. und Hausnummer</TextRegular>
          <FKInput
            clearSelectedItem={clearSelectedItem}
            value={values.address}
            label={'address'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.address}
          />
          <TextRegular style={styles.label}>Adresszusatz</TextRegular>
          <FKInput
            clearSelectedItem={clearSelectedItem}
            value={values.appendix}
            label={'appendix'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.appendix}
          />
          <View style={styles.addressWrapper}>
            <View style={styles.address}>
              <TextRegular style={styles.label}>ZIP Code</TextRegular>
              <FKInput
                clearSelectedItem={clearSelectedItem}
                value={values.zipCode}
                label={'zipCode'}
                keyboardType={'numeric'}
                handleChange={setFieldValue}
                error={errors.zipCode}
                validator={validateNumber}
              />
            </View>
            <View style={styles.address}>
              <TextRegular style={styles.label}>Ort</TextRegular>
              <FKInput
                clearSelectedItem={clearSelectedItem}
                value={values.city}
                label={'city'}
                keyboardType={'numeric'}
                handleChange={setFieldValue}
                error={errors.city}
                validator={validateNumber}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View>
            <TextBold style={styles.paragraph}>Pärsonalishe Daten</TextBold>
          </View>
          <TextRegular style={styles.label}>Beruf bzw. Tätigkeit</TextRegular>
          <FKSelect
            onOpen={onOpenSelector('employmentType')}
            open={openedSelector === 'employmentType'}
            error={null}
            itemsList={values.employmentType}
            label={'employmentType'}
            selectedItem={
              values.employmentType.find(item => item.selected)?.value || ''
            }
            handleChange={setFieldValue}
            containerStyle={{ marginTop: 6 }}
          />
          <TextRegular style={styles.label}>
            Höchster Bildungsabschluss
          </TextRegular>
          <FKSelect
            open={openedSelector === 'educationLevel'}
            onOpen={onOpenSelector('educationLevel')}
            error={null}
            itemsList={values.educationLevel}
            selectedItem={
              values.educationLevel.find(item => item.selected)?.value || ''
            }
            handleChange={setFieldValue}
            label={'educationLevel'}
            containerStyle={{ marginTop: 6 }}
          />
          <View style={styles.addressWrapper}>
            <View style={styles.address}>
              <TextRegular style={styles.label}>Staatbürgerschaft</TextRegular>
              <CountryPicker
                error={errors.citizenship}
                country={values.citizenship}
                handleChange={setFieldValue}
              />
            </View>
            <View style={styles.address}>
              <TextRegular style={styles.label}>Geburtsdatum</TextRegular>
              <FKDatePicker
                value={values.birthDate}
                error={null}
                handleChange={setFieldValue}
                label={'birthDate'}
              />
            </View>
          </View>
          <TextRegular style={styles.label}>Geburtsort</TextRegular>
          <FKInput
            clearSelectedItem={clearSelectedItem}
            value={values.placeOfBirth}
            label={'placeOfBirth'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.placeOfBirth}
          />
          <View style={styles.divider} />
          <View>
            <TextBold style={styles.paragraph}>Statusabfrage</TextBold>
          </View>
          <View style={styles.privacy}>
            <Pressable
              onPress={() => setIsPolitic(!isPolitic)}
              hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: COLORS.activeColor,
                  },
                ]}>
                {isPolitic && <CheckIcon fill={COLORS.activeColor} />}
              </View>
            </Pressable>
            <TextRegular style={styles.termsText}>
              Ich bestätige, dass ich keine politisch exponierte Person (PEP),
              kein unmittelbares Familiemitglied einer politisch exponierten
              Person und keine politisch exponierten Person bekanntermassen
              nahestende Person bin.
            </TextRegular>
          </View>
          <View style={[styles.privacy, { marginBottom: 10 }]}>
            <Pressable
              onPress={() => setSecondCheckbox(!secondCheckbox)}
              hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: COLORS.activeColor,
                  },
                ]}>
                {secondCheckbox && <CheckIcon fill={COLORS.activeColor} />}
              </View>
            </Pressable>
            <TextRegular style={styles.termsText}>
              Ich versichere, auf eigene Rechnung und im eigenen
              wirtschaftlichen interesse zu handeln.
            </TextRegular>
          </View>
          <View style={styles.divider} />

          <View>
            <TextBold style={styles.paragraph}>Ausweisdaten</TextBold>
          </View>
          <View style={styles.addressWrapper}>
            <View style={styles.address}>
              <TextRegular style={styles.label}>Ausweisart</TextRegular>
              <FKSelect
                open={openedSelector === 'idType'}
                onOpen={onOpenSelector('idType')}
                error={null}
                itemsList={values.idType}
                selectedItem={
                  values.idType.find(item => item.selected)?.value || ''
                }
                handleChange={setFieldValue}
                label={'idType'}
                containerStyle={{ marginTop: 6 }}
              />
            </View>
            <View style={styles.address}>
              <TextRegular style={styles.label}>Ausweisnummer</TextRegular>
              <FKInput
                clearSelectedItem={clearSelectedItem}
                value={values.idNumber}
                label={'idNumber'}
                keyboardType={'default'}
                handleChange={setFieldValue}
                error={errors.idNumber}
              />
            </View>
          </View>

          <TextRegular style={styles.label}>Ausstellende Behörde</TextRegular>
          <FKInput
            clearSelectedItem={clearSelectedItem}
            value={values.issuingAuthority}
            label={'issuingAuthority'}
            keyboardType={'default'}
            handleChange={setFieldValue}
            error={errors.issuingAuthority}
          />

          <View style={styles.addressWrapper}>
            <View style={styles.address}>
              <TextRegular style={styles.label}>
                Ausweis augestellt am
              </TextRegular>
              <FKDatePicker
                error={null}
                handleChange={setFieldValue}
                label={'idIssuedOn'}
                value={values.idIssuedOn}
              />
            </View>
            <View style={styles.address}>
              <TextRegular style={styles.label}>Ausweis gülteg bis</TextRegular>
              <FKDatePicker
                value={values.idValidUntil}
                error={null}
                handleChange={setFieldValue}
                label={'idValidUntil'}
              />
            </View>
          </View>

          <View>
            <ButtonShared onPress={submitValues} style={styles.button}>
              <TextBold style={styles.buttonText}>Speichern</TextBold>
            </ButtonShared>
          </View>
        </KeyboardWrapper>
      </Animated.View>
    </View>
  );
};

export default KYCScreen;
