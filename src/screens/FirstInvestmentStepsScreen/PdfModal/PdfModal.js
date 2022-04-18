import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import Loader from '../../../components/Loader/Loader';
import ButtonShared from '../../../components/ButtonShared';
import TextBold from '../../../components/TextWrappers/TextBold';
import { COLORS } from '../../../constants/colors';

const PdfModal = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { item, handleSubmit } = route.params;

  const onSubmit = () => {
    handleSubmit();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pdf
        key={item.name}
        renderActivityIndicator={() => null}
        source={{
          uri: `${item.url}`,
        }}
        onLoadComplete={() => {
          setIsLoading(false);
        }}
        style={styles.pdf}
      />
      {isLoading && <Loader isModal />}
      <View style={styles.buttonWrapper}>
        <ButtonShared onPress={onSubmit} style={styles.button}>
          <TextBold style={styles.buttonText}>Weiter</TextBold>
        </ButtonShared>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: COLORS.white,
  },
  pdf: {
    flex: 1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    height: Dimensions.get('window').height,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  buttonWrapper: {
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
  },
});

export default PdfModal;
