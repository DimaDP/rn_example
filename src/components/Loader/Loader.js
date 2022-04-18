import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, View, Modal } from 'react-native';
import LoaderIcon from '../../assets/images/loader.svg';
import { COLORS } from '../../constants/colors';

const Loader = ({ isModal = false }) => {
  const height = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(height, {
          toValue: 100,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(height, {
          toValue: -100,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return isModal ? (
    <Modal style={styles.container} animationType={'none'}>
      <Animated.View style={styles.container}>
        <Animated.View
          style={{ position: 'relative', transform: [{ translateY: height }] }}>
          <LoaderIcon />
        </Animated.View>
      </Animated.View>
    </Modal>
  ) : (
    <View style={styles.container} animationType={'none'}>
      <Animated.View style={styles.container}>
        <Animated.View
          style={{ position: 'relative', transform: [{ translateY: height }] }}>
          <LoaderIcon />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Loader;
