import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 16,
  },
  props: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  propsUnit: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'flex-end',
  },
  propsText: {
    color: COLORS.darkTextColor,
    fontSize: 11,
  },
  propsValue: {
    color: COLORS.white,
    fontSize: 14,
    marginLeft: 8,
  },
  aboutText: {
    color: COLORS.white,
    marginTop: 10,
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
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    position: 'absolute',
    top: 0,
  },
  progressOwn: {
    width: '10%',
    height: 8,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    position: 'absolute',
    top: 0,
  },
  calculateValue: {
    color: COLORS.white,
    fontSize: 12,
  },
  calculateText: {
    fontSize: 10,
    marginLeft: 8,
    color: COLORS.darkTextColor,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.white,
    fontSize: 16,
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  logo: {
    position: 'absolute',
    top: 12,
    left: 15,
  },
  inputContainer: {
    height: 42,
    marginVertical: 16,
  },
});

export default styles;
