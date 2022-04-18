import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  setRouterColor,
  setStatusBarColor,
} from '../../store/actions/statusBar';
import { COLORS } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Loader from '../../components/Loader/Loader';
import Pdf from 'react-native-pdf';
import ButtonShared from '../../components/ButtonShared';
import TextRegular from '../../components/TextWrappers/TextRegular';
import CheckIcon from '../../assets/icons/checked.svg';
import TextBold from '../../components/TextWrappers/TextBold';
import { getPendingTransactions } from '../../store/actions/transactions';

const PDFScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  let { documents } = useSelector(store => store.transactions);
  const [currentDoc, setCurrentDoc] = useState(documents[0]);
  const [checked, setChecked] = useState(false);
  const { isEdit } = route.params;
  const [disabled, setIsDisabled] = useState(currentDoc.needFullReview);
  const [isLoading, setIsLoading] = useState(true);

  const handleNextDoc = () => {
    const currentIndex = documents.indexOf(currentDoc);
    if (currentIndex !== documents.length - 1) {
      setCurrentDoc(documents[currentIndex + 1]);
      setIsDisabled(true);
      setIsLoading(true);
    } else {
      dispatch(getPendingTransactions());
      isEdit ? navigation.navigate('Dashboard') : navigation.navigate('Home');
    }
  };

  useEffect(() => {
    if (currentDoc.needCheckBox) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [currentDoc]);

  useFocusEffect(
    useCallback(() => {
      dispatch(setStatusBarColor(COLORS.mainBackground));
      dispatch(setRouterColor(COLORS.mainBackground));
    }, [dispatch]),
  );

  const checkPrivacy = () => setChecked(!checked);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textWrapper}>
        <Pdf
          renderActivityIndicator={() => null}
          //TODO delete force url changing
          source={{
            uri: `${currentDoc.url}${
              documents.indexOf(currentDoc) % 2 === 0 ? '/' : ''
            }`,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
            setIsLoading(false);
          }}
          onPageChanged={(page, numberOfPages) => {
            if (page === numberOfPages) {
              setIsDisabled(false);
            }
          }}
          onLoadProgress={x => {
            console.log(x);
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      </View>
      {currentDoc.needCheckBox && (
        <View style={styles.privacy}>
          <Pressable
            onPress={checkPrivacy}
            hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}>
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: COLORS.activeColor,
                },
              ]}>
              {checked && <CheckIcon fill={COLORS.activeColor} />}
            </View>
          </Pressable>
          <TextRegular style={styles.termsText}>
            I agree to the{' '}
            <TextRegular style={styles.link}>{currentDoc.name}</TextRegular>
          </TextRegular>
        </View>
      )}
      <ButtonShared
        style={{ width: '80%', marginTop: 20 }}
        disabled={disabled || !checked}
        onPress={handleNextDoc}>
        <TextBold style={styles.buttonText}>
          {documents.indexOf(currentDoc) === documents.length - 1
            ? 'Confirm'
            : 'Next'}
        </TextBold>
      </ButtonShared>
      {isLoading && <Loader isModal />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 10,
    borderRadius: 12,
  },
  textWrapper: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
  },
  pdf: {
    flex: 1,
    borderRadius: 12,
    // width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  privacy: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  termsText: {
    marginLeft: 10,
    color: COLORS.graySecondary,
    fontSize: 12,
  },
  link: {
    color: COLORS.linkColor,
  },
  checkbox: {
    // backgroundColor: COLORS.inputBackground,
    width: 24,
    height: 24,
    borderRadius: 2,
    overflow: 'hidden',

    borderColor: COLORS.linkColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default PDFScreen;
