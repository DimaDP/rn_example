import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextRegular from '../../components/TextWrappers/TextRegular';
import { COLORS } from '../../constants/colors';
import Loader from '../../components/Loader/Loader';
import { getFAQ } from '../../store/actions/settings';

const FAQScreen = () => {
  const { faq } = useSelector(store => store.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFAQ());
  }, []);

  if (!faq) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.textWrapper}>
        {/*<TextRegular style={styles.text}>{faq?.text}</TextRegular>*/}
        {faq.map(item => {
          return (
            <React.Fragment key={item.id}>
              <TextRegular style={styles.text}>{item.question}</TextRegular>
              <TextRegular style={{ ...styles.text, marginBottom: 16 }}>
                {item.answer}
              </TextRegular>
            </React.Fragment>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
  },
});

export default FAQScreen;
