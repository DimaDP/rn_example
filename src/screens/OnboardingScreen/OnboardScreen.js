import React, { useEffect } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './OnboardScreenStyles';
import { COLORS } from '../../constants/colors';
import FirstImage from '../../assets/images/onboarding1.svg';
import SecondImage from '../../assets/images/onboarding2.svg';
import ThirdImage from '../../assets/images/onboarding3.svg';
import { useDispatch } from 'react-redux';
import { setStatusBarColor } from '../../store/actions/statusBar';
import TextBold from '../../components/TextWrappers/TextBold';
import TextRegular from '../../components/TextWrappers/TextRegular';
import TextMedium from '../../components/TextWrappers/TextMedium';

const images = [FirstImage, SecondImage, ThirdImage].map((image, idx) => ({
  image,
  key: idx,
}));

const imageText = [
  {
    header: 'Welcome to the world of Token',
    text: 'Invest, buy and sell in one safe and simple app.',
  },
  {
    header: 'Invest quick and easily',
    text: 'Use your credit card, bank account, or Apple Pay to invest and other assets. ',
  },
  {
    header: 'Track your investments',
    text: 'Track prices of your portfolio and easily exchange between assets.',
  },
];

const screenWidth = Dimensions.get('window').width;

const OnboardScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  let flatListRef = React.useRef(null);

  const onViewRef = React.useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0].index);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatusBarColor(COLORS.activeColor));
  }, [dispatch]);

  const gotoNextPage = async () => {
    if (activeIndex + 1 < images.length) {
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
      return;
    }
    await AsyncStorage.setItem('WAS_VISITED', JSON.stringify(true));
    navigation.navigate('SignInScreen');
  };

  const skipOnboardScreen = async () => {
    await AsyncStorage.setItem('WAS_VISITED', JSON.stringify(true));
    navigation.navigate('SignInScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipContainer}>
        <Pressable onPress={skipOnboardScreen}>
          {activeIndex !== 2 && (
            <TextMedium style={styles.buttonText}>Skip</TextMedium>
          )}
        </Pressable>
      </View>
      <FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        style={styles.flatList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        data={images}
        keyExtractor={item => item.key.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <item.image
              width={screenWidth}
              height={screenWidth * 0.7}
              style={styles.image}
            />
            <TextBold style={styles.heading}>
              {imageText[item.key].header}
            </TextBold>
            <TextRegular style={styles.text}>
              {imageText[item.key].text}
            </TextRegular>
          </View>
        )}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={gotoNextPage}>
          <TextBold style={styles.buttonNext}>
            {activeIndex !== 2 ? 'next' : 'done'}
          </TextBold>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardScreen;
