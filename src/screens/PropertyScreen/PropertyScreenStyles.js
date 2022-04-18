import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
  heading: {
    fontSize: 16,
    color: COLORS.white,
    paddingHorizontal: 16,
  },
  placement: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 12,
    color: COLORS.darkTextColor,
  },
  image: {
    height: 250,
    width: screenWidth,
  },
  buttons: {
    paddingHorizontal: 16,
  },
  tabsButtons: {
    backgroundColor: COLORS.graySecondary,
    height: 26,
    padding: 2,
    borderRadius: 4,
    marginTop: 30,
    flexDirection: 'row',
  },
  tabButton: {
    color: COLORS.darkTextColor,
    fontSize: 14,
    textAlign: 'center',
  },
  tabCButtonActive: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  textContainer: {
    flex: 1,
    height: 22,
  },
  textContainerActive: {
    backgroundColor: COLORS.activeColor,
    flex: 1,
    height: 22,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 5,
    marginBottom: 10,
    borderColor: 'transparent',
  },
});

export default styles;
