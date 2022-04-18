import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  heading: {
    color: COLORS.white,
    fontSize: 25,
  },
  headingText: {
    color: COLORS.white,
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 25,
    backgroundColor: COLORS.mainBackground,
  },
  label: {
    marginLeft: 15,
    color: COLORS.white,
    fontSize: 12,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'flex-end',
    flex: 1,
    // paddingHorizontal: 16,
    marginBottom: 20,
    minHeight: 80,
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: COLORS.inputBackground,
    width: 24,
    height: 24,
    borderRadius: 2,
    overflow: 'hidden',

    borderColor: COLORS.linkColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacy: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  termsText: {
    marginLeft: 10,
    color: COLORS.white,
    fontSize: 12,
  },
  link: {
    color: COLORS.linkColor,
  },
});

export default styles;
