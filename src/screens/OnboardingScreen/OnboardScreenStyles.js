import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.activeColor,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flatList: {
    flexGrow: 0,
  },
  imageContainer: {
    flexDirection: 'column',
    width: screenWidth,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.white,
    borderRadius: 1,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  dots: {
    bottom: 50,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  heading: {
    marginTop: 30,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 20,
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    width: '100%',
    borderRadius: 6,
    backgroundColor: COLORS.dividerColor,
  },
  buttonText: {
    color: COLORS.darkTextColor,
    fontSize: 14,
  },
  buttonNext: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 18,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  skipContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
