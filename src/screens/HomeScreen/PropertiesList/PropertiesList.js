import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Property from './Property';
import TextBold from '../../../components/TextWrappers/TextBold';
import styles from './PropertiesListStyles';
import TextMedium from '../../../components/TextWrappers/TextMedium';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import I18n from 'i18n-js';

const PropertiesList = () => {
  const { propertiesByToken } = useSelector(store => store.tokens);
  const navigation = useNavigation();

  const navigateToBundles = () => {
    navigation.navigate('Bundles');
  };

  const renderItem = useCallback(
    ({ item }) => <Property item={item} />,
    [propertiesByToken],
  );

  return (
    <>
      <View style={styles.container}>
        <TextBold style={styles.heading}>
          {I18n.t('Properties Bundle')}
        </TextBold>
        <TouchableOpacity onPress={navigateToBundles}>
          <TextMedium style={styles.all}>{I18n.t('See all')}</TextMedium>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ flexGrow: 0 }}
        horizontal={true}
        data={propertiesByToken}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
        }}
        keyExtractor={item => item.id}
        initialNumToRender={3}
        renderItem={renderItem}
      />
    </>
  );
};

export default PropertiesList;
