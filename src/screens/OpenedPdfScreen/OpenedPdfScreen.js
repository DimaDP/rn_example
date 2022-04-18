import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import { Dimensions, StyleSheet, View } from 'react-native';
import Loader from '../../components/Loader/Loader';

const OpenedPdfScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { item } = route.params;
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    borderRadius: 12,
    height: Dimensions.get('window').height,
  },
});

export default OpenedPdfScreen;
