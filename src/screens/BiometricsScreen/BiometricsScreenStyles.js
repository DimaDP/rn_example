import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
    lineHeight: 24,
    marginTop: 40,
    textAlign: 'center',
  },
  button: {
    width: screenWidth - 32,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
  },
  notNow: {
    width: screenWidth - 32,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notNowText: {
    fontSize: 14,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default styles;
