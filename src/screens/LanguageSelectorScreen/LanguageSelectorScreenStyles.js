import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
  heading: {
    color: COLORS.white,
    fontSize: 18,
    marginBottom: 25,
  },
  wrapper: {
    flex: 3,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  dropdownContainer: {
    height: 42,
    backgroundColor: COLORS.graySecondary,
    borderColor: '#5B7DF3',
  },
  textStyle: {
    color: COLORS.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  dropDownContainerStyle: {
    marginTop: 12,
    backgroundColor: COLORS.graySecondary,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#5B7DF3',
  },
  buttonText: {
    color: 'white',
    lineHeight: 48,
    textAlign: 'center',
    letterSpacing: 2,
  },
  next: {},
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
