import React, { useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextRegular from '../../components/TextWrappers/TextRegular';
import { COLORS } from '../../constants/colors';
import { getTransactionDocuments } from '../../store/actions/transactions';
import DocIcon from '../../assets/icons/document.svg';
import Loader from '../../components/Loader/Loader';
import { getTerms } from '../../store/actions/settings';

const TermsScreen = ({ navigation }) => {
  const { terms, isLoading } = useSelector(store => store.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTerms());
  }, []);

  console.log(terms, terms);

  if (isLoading) {
    return <Loader />;
  }
  const handleOpenDocument = item => {
    navigation.navigate('OpenedPdfScreen', { item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textWrapper}>
        {terms &&
          terms.map(item => {
            return (
              <TouchableOpacity
                key={item.name}
                style={styles.document}
                onPress={() => handleOpenDocument(item)}>
                <View style={styles.iconWrapper}>
                  <DocIcon />
                </View>
                <View style={styles.header}>
                  <TextRegular style={styles.heading}>Document:</TextRegular>
                  <TextRegular style={styles.name}>{item.name}</TextRegular>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  document: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
  },
  heading: {
    color: COLORS.darkTextColor,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  name: {
    color: COLORS.white,
    fontSize: 14,
  },
  pdf: {
    flex: 1,
    borderRadius: 12,
    height: Dimensions.get('window').height,
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
});

export default TermsScreen;
