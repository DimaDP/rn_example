import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
  errorContainer: {
    flex: 1,
  },
  dayHeading: {
    color: COLORS.darkTextColor,
    fontSize: 14,
    textAlign: 'center',
  },
  day: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  action: {
    borderBottomColor: COLORS.dividerColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 24,
  },
  operation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  operationName: {
    color: COLORS.white,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  operationValue: {
    color: COLORS.white,
    fontSize: 14,
  },
  operationStatus: {
    color: COLORS.darkTextColor,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  operationDate: {
    letterSpacing: 1,
    color: COLORS.darkTextColor,
    fontSize: 12,
    textTransform: 'none',
  },
  emptyHeading: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  emptyText: {
    color: COLORS.darkTextColor,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  empty: {
    marginTop: 100,
    width: '100%',
    alignItems: 'center',
  },
});

export default styles;
