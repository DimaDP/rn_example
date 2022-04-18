import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'space-between',
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
    width: '100%',
    paddingTop: 50,
    flex: 1,
    backgroundColor: COLORS.mainBackground,
    paddingHorizontal: 16,
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
    textTransform: 'uppercase',
  },
  button: {
    marginTop: 50,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  root: { padding: 20, minHeight: 300 },
  codeFieldRoot: {
    marginTop: 20,
    justifyContent: 'space-around',
  },
  cell: {
    fontFamily: 'Poppins-Medium',
    width: 50,
    height: 50,
    lineHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    color: COLORS.white,
    borderWidth: 2,
    backgroundColor: COLORS.inputBackground,
    borderColor: 'transparent',
    textAlign: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  focusCell: {
    borderRadius: 8,
    borderColor: '#5B7DF3',
  },
  restore: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restoreText: {
    color: COLORS.linkColor,
    fontSize: 13,
  },
});

export default styles;
