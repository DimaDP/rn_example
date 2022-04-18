import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Property from '../HomeScreen/PropertiesList/Property';
import { useSelector } from 'react-redux';

const BundlesScreen = ({ navigation }) => {
  const { propertiesByToken } = useSelector(store => store.tokens);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {propertiesByToken &&
        propertiesByToken.map(property => (
          <Property key={property.id} item={property} />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default BundlesScreen;
