import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 92,
    backgroundColor: COLORS.inputBackground,
    marginBottom: 16,
    flexDirection: 'row',
    borderRadius: 8,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  imageContainer: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 51,
    height: 68,
  },
  info: {
    justifyContent: 'space-evenly',
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  heading: {
    color: COLORS.darkTextColor,
    fontSize: 12,
    marginRight: 8,
  },
  value: {
    color: COLORS.white,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  valueLocation: {
    fontSize: 12,
    color: COLORS.activeColor,
  },
  selected: {
    position: 'absolute',
    top: 9,
    right: 9,
  },
});

export default styles;
