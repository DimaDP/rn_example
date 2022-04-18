import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  all: {
    fontSize: 14,
    color: COLORS.darkTextColor,
  },
  heading: {
    color: COLORS.white,
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  cardHeading: {
    color: COLORS.white,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  imageContainer: {
    width: screenWidth - 32,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: 'stretch',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  favorite: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderLeftColor: COLORS.mainBackground,
    borderBottomColor: COLORS.mainBackground,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.favoriteButtonColor,
  },
  propertyInfo: {
    flex: 1,
    height: 80,
    backgroundColor: COLORS.favoriteButtonColor,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  costs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  available: {
    flexDirection: 'row',
  },
  availableText: {
    color: COLORS.white,
    fontSize: 12,
  },
  lightText: {
    fontFamily: 'Poppins-Light',
  },
  funded: {
    flexDirection: 'row',
  },
  fundedText: {
    color: COLORS.darkTextColor,
    fontSize: 12,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    borderRadius: 6,
    backgroundColor: COLORS.inputBackground,
    marginTop: 10,
  },
  progress: {
    width: '63%',
    height: 8,
    borderRadius: 6,
    position: 'absolute',
    top: 0,
  },
  priceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceHeading: {
    fontSize: 12,
    color: COLORS.darkTextColor,
  },
  priceValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  propertyLink: {
    fontSize: 12,
    color: COLORS.linkColor,
  },
});

export default styles;
