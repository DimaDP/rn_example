import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const screenWidth = Dimensions.get('window').width;
export const tabWidth = screenWidth / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    marginTop: 25,
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.dividerColor,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonTextDisabled: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.darkTextColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  slider: {
    height: 4,
    width: tabWidth,
    backgroundColor: COLORS.white,
    top: -4,
  },
  buttonSubmitBuy: {
    width: screenWidth - 32,
    marginVertical: 20,
    backgroundColor: COLORS.positiveSum,
  },
  buttonSubmitBuyText: {
    color: COLORS.dividerColor,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  buttonSubmitSell: {
    width: screenWidth - 32,
    marginVertical: 20,
    backgroundColor: COLORS.errorColor,
  },
  buttonSubmitBuySell: {
    color: COLORS.dividerColor,
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
