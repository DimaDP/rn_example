import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
  form: {
    flex: 1,
  },
  heading: {
    width: '100%',
    marginTop: 30,
  },
  headingText: {
    fontSize: 25,
    marginBottom: 10,
    color: COLORS.white,
  },
  signInText: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 25,
  },
  inputs: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.white,
    fontSize: 16,
    borderRadius: 6,
    height: 40,
    marginTop: 6,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  button: {
    width: '100%',
  },
  buttonIos: {
    justifyContent: 'flex-end',
    flex: 1,
    // paddingHorizontal: 16,
    marginBottom: 20,
    minHeight: 80,
    alignItems: 'center',
  },
  restore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restoreText: {
    color: COLORS.linkColor,
    fontSize: 13,
  },
  text: {
    color: COLORS.white,
    fontSize: 13,
  },
  register: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textLabel: {
    fontSize: 12,
    color: COLORS.white,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  errorText: {
    textAlign: 'center',
    color: COLORS.errorColor,
    fontSize: 16,
  },
  headingLg: {
    color: COLORS.white,
    fontSize: 25,
  },
});

export default styles;
