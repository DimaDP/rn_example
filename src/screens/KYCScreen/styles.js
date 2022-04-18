import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const screeWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    backgroundColor: COLORS.inActiveTabIcon,
    width: screeWidth,
    height: 0.6,
    left: -16,
    marginBottom: 16,
  },
  innerContainer: {
    position: 'relative',
    zIndex: 50,
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.mainBackground,
  },
  contentContainer: {
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.activeColor,
    height: 50,
  },
  heading: {
    color: COLORS.white,
    fontSize: 25,
  },
  headingText: {
    color: COLORS.darkTextColor,
    fontSize: 16,
    marginVertical: 25,
  },
  label: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 10,
  },
  buttonContainer: {
    backgroundColor: COLORS.mainBackground,
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    width: screeWidth - 32,
  },
  addressWrapper: {
    zIndex: 100,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  address: {
    width: '47%',
  },
  error: {
    paddingLeft: 10,
    color: COLORS.errorColor,
    fontSize: 16,
    height: 20,
  },
  icon: {
    position: 'absolute',
    top: 16,
    right: 15,
  },
  uploadButton: {
    flexDirection: 'row',
    height: 38,
    width: '100%',
    backgroundColor: COLORS.activeColor,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: COLORS.white,
    fontSize: 14,
    letterSpacing: 0.02,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  paragraph: {
    fontSize: 16,
    color: COLORS.white,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.white,
    fontSize: 16,
    borderRadius: 6,
    height: 42,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontFamily: 'Poppins-Medium',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 2,
    overflow: 'hidden',
    borderColor: COLORS.linkColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    marginLeft: 10,
    lineHeight: 20,
    color: COLORS.white,
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  privacy: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
});
