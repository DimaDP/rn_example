import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
  heading: {
    color: COLORS.white,
    fontSize: 17,
    marginLeft: 16,
    marginBottom: 15,
  },
  tokensList: {
    paddingHorizontal: 16,
  },
  tokensHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  tokens: {
    color: COLORS.white,
    fontSize: 18,
  },
  seeAll: {
    color: COLORS.darkTextColor,
    fontSize: 14,
  },
});

export default styles;
