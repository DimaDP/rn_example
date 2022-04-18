import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextLight from '../../../components/TextWrappers/TextLight';
import TextBold from '../../../components/TextWrappers/TextBold';
import { COLORS } from '../../../constants/colors';
import TextRegular from '../../../components/TextWrappers/TextRegular';

const Overview = ({ property }) => {
  const { constructionYear, livingArea, roomCount, description } = property;
  return (
    <View style={styles.container}>
      <TextBold style={styles.heading}>Property type</TextBold>
      <View style={styles.props}>
        <View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Construction year:</TextLight>
            <TextBold style={styles.propsValue}>{constructionYear}</TextBold>
          </View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Living arae:</TextLight>
            <TextBold style={styles.propsValue}>{livingArea} m2</TextBold>
          </View>
        </View>

        <View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Total units:</TextLight>
            <TextBold style={styles.propsValue}>{roomCount}</TextBold>
          </View>
          <View style={styles.propsUnit}>
            <TextLight style={styles.propsText}>Bedroom/Bath:</TextLight>
            <TextBold style={styles.propsValue}>{roomCount} Bed</TextBold>
          </View>
        </View>
      </View>
      <TextBold style={styles.heading}>About</TextBold>
      <View>
        <TextRegular style={styles.aboutText}>{description}</TextRegular>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 15,
  },
  heading: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 16,
  },
  props: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  propsUnit: {
    flexDirection: 'row',
    marginTop: 5,
  },
  propsText: {
    color: COLORS.darkTextColor,
    fontSize: 11,
  },
  propsValue: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 8,
  },
  aboutText: {
    color: COLORS.white,
    marginTop: 10,
  },
});

export default Overview;
