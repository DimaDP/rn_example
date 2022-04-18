import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  document: {
    flexDirection: 'row',
    marginBottom: 34,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoWrapper: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  firstColumn: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    color: COLORS.darkTextColor,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  textBold: {
    color: COLORS.white,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  secondColumn: {},
});

export default styles;
