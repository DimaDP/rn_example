import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import TextMedium from '../../../components/TextWrappers/TextMedium';
import ChevronRight from '../../../assets/icons/chvron_right.svg';

const STEPS = [
  { name: 'Investitionsdaten' },
  { name: 'Kenntnisse und\n' + 'Erfahrungen' },
  { name: 'Wallet' },
  { name: 'Übersicht der Kosten und\n' + 'Zuwendungen\n' },
  { name: 'Zusammenfassung' },
  { name: 'Zahlungsdetails' },
];

const Item = ({ name, textColor, index, itemColor }) => {
  return (
    <View style={styles.item}>
      <View style={[styles.position, { backgroundColor: itemColor }]}>
        <TextMedium style={styles.number}>{index + 1}</TextMedium>
      </View>
      <TextRegular style={{ ...styles.title, color: textColor }}>
        {name}
      </TextRegular>
      {index !== 5 && <ChevronRight />}
    </View>
  );
};

const StepsCarousel = ({ step = 1 }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current?.scrollToIndex({ index: step - 1, viewPosition: 0 });
    }
  }, [step]);

  const onScrollToIndexFailed = error => {
    const { index, averageItemLength } = error;
    const offset = index * averageItemLength;
    // Layout doesn't know the exact location of the requested element.
    // Falling back to calculating the destination manually
    ref.current?.scrollToOffset({
      offset,
    });
    setTimeout(() => {
      if (STEPS.length !== 0 && ref !== null) {
        ref.current?.scrollToIndex({ index: error.index, viewPosition: 0 });
      }
    }, 100);
  };

  const footer = () => {
    return <View style={styles.footer} />;
  };

  const renderItem = ({ item, index }) => (
    <Item
      name={item.name}
      index={index}
      textColor={step - 1 === index ? COLORS.white : COLORS.inActiveTabIcon}
      itemColor={
        step - 1 === index ? COLORS.activeColor : COLORS.favoriteButtonColor
      }
    />
  );

  return (
    <FlatList
      ref={ref}
      horizontal
      data={STEPS}
      keyExtractor={item => `${item.name}_${STEPS.indexOf(item)}`}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
      ListFooterComponent={footer}
      showsHorizontalScrollIndicator={false}
      onScrollToIndexFailed={onScrollToIndexFailed}
      style={styles.flatList}
    />
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  contentContainerStyle: {
    height: 50,
  },
  flatList: {
    flexGrow: 0,
    paddingHorizontal: 16,
  },
  item: {
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    letterSpacing: 0.3,
    fontSize: 15,
    color: COLORS.white,
    marginRight: 16,
  },
  position: {
    borderRadius: 17,
    width: 34,
    height: 34,
    backgroundColor: COLORS.favoriteButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  number: {
    fontSize: 14,
    color: COLORS.white,
  },
  footer: {
    width: screenWidth / 2,
  },
});

export default StepsCarousel;
