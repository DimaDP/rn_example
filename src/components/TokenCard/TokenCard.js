import React, { useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import styles from './TokenCardStyles';
import TextLight from '../TextWrappers/TextLight';
import TextRegular from '../TextWrappers/TextRegular';
import TokenIcon from '../../assets/icons/token_placeholder.svg';
import Selected from '../../assets/icons/selected.svg';
import UnSelected from '../../assets/icons/unselected.svg';

const TokenCard = ({ token }) => {
  // const [isSelected, setIsSelected] = useState(false);

  const { location, availableTokens, properties, currency, amount, icon } =
    token;

  // const setSelected = () => setIsSelected(!isSelected);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: icon,
          }}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.infoLine}>
          <TextLight style={styles.heading}>Location:</TextLight>
          <TextRegular style={styles.valueLocation}>{location}</TextRegular>
        </View>
        <View style={styles.infoLine}>
          <TextLight style={styles.heading}>Available tokens:</TextLight>
          <TextRegular style={styles.value}>{availableTokens}</TextRegular>
        </View>
        <View style={styles.infoLine}>
          <TextLight style={styles.heading}>Token price:</TextLight>
          <TextRegular style={styles.value}>
            {currency} {amount.toFixed(2)}
          </TextRegular>
        </View>
        <View style={styles.infoLine}>
          <TextLight style={styles.heading}>Properties:</TextLight>
          <TextRegular style={styles.value}>{properties}</TextRegular>
        </View>
      </View>
      {/*<TouchableOpacity style={styles.selected} onPress={setSelected}>*/}
      {/*  {isSelected ? <Selected /> : <UnSelected />}*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};

export default TokenCard;
