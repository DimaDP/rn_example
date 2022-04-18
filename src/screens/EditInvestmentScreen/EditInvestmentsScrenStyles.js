import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const screenWidth = Dimensions.get('window').width;
export const tabWidth = screenWidth / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonSubmitBuy: {
    width: screenWidth - 32,
    marginVertical: 20,
  },
  buttonSubmitBuyText: {
    color: COLORS.white,
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
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
