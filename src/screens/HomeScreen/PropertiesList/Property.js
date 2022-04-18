import React, { memo, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Example from '../../../assets/images/Example.png';
import styles from './PropertiesListStyles';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import { useNavigation } from '@react-navigation/native';
import ImageShared from '../../../components/ImageShared/ImageShared';
import TextMedium from '../../../components/TextWrappers/TextMedium';
import { getPropertyById } from '../../../store/actions/tokens';
import { useDispatch } from 'react-redux';

const Property = ({ item }) => {
  const { imageUrl, addressGeocoded, livingArea, name } = item;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleNavigate = async () => {
    await dispatch(getPropertyById(item.id));
    navigation.navigate('Property', {
      propertyId: item.id,
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.imageContainer}>
        <ImageShared
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={styles.propertyInfo}>
          <View style={styles.priceContainer}>
            <TextMedium style={styles.cardHeading}>{name}</TextMedium>
            <View style={[styles.costs]}>
              <TextRegular style={styles.priceHeading}>
                Living Area:
              </TextRegular>
              <TextRegular style={styles.priceValue}>
                {' '}
                {livingArea} m2
              </TextRegular>
            </View>
            <View style={[styles.costs]}>
              <TextRegular style={styles.propertyLink}>
                {addressGeocoded}
              </TextRegular>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Property);
