import React, { useRef, useState } from 'react';
import TextRegular from '../../components/TextWrappers/TextRegular';
import {
  ScrollView,
  View,
  FlatList,
  Animated,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  TouchableOpacity,
} from 'react-native';
import styles from './PropertyScreenStyles';
import { COLORS } from '../../constants/colors';
import TextBold from '../../components/TextWrappers/TextBold';
import LocationIcon from '../../assets/icons/location.svg';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import Overview from './PropertyTabs/Overview';
import ImageShared from '../../components/ImageShared/ImageShared';
import { useSelector } from 'react-redux';

const PropertyScreen = ({ route }) => {
  const { selectedProperty } = useSelector(store => store.tokens);
  const [currentIdx] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const openMaps = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(`geo:0,0?q=${50},${30}(${'some point'})`).catch(err =>
        console.error('An error occurred', err),
      );
    } else {
      Linking.openURL(
        `http://maps.apple.com/?ll=${50},${30}&q=${'some point'}`,
      ).catch(err => console.error('An error occurred', err));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedProperty && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          keyboardVerticalOffset={100}
          style={{ flex: 1, backgroundColor: 'transparent' }}>
          <ScrollView style={{ paddingTop: 16 }}>
            <TextBold style={styles.heading}>{selectedProperty.name}</TextBold>
            <View style={styles.placement}>
              <LocationIcon />
              <TouchableOpacity onPress={openMaps}>
                <TextRegular style={styles.locationText}>
                  {selectedProperty.addressGeocoded}
                </TextRegular>
              </TouchableOpacity>
            </View>
            <FlatList
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                },
              )}
              horizontal
              pagingEnabled
              initialNumToRender={5}
              scrollEventThrottle={16}
              data={selectedProperty.images}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ImageShared
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                />
              )}
            />
            <View>
              <ExpandingDot
                data={selectedProperty.images}
                expandingDotWidth={12}
                scrollX={scrollX}
                inActiveDotOpacity={1}
                inActiveDotColor={COLORS.white}
                dotStyle={{
                  width: 5,
                  height: 5,
                  backgroundColor: COLORS.white,
                  borderRadius: 1,
                  marginHorizontal: 5,
                  marginVertical: 5,
                }}
                containerStyle={{
                  top: 10,
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              />
            </View>
            <View style={styles.buttons}>
              {currentIdx === 0 && <Overview property={selectedProperty} />}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default PropertyScreen;
