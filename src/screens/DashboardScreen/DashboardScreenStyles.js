import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
  modal: { margin: 0, justifyContent: 'flex-end' },
  heading: {
    color: COLORS.white,
    fontSize: 17,
    marginLeft: 16,
    marginBottom: 15,
  },
  headingTokens: {
    color: COLORS.white,
    fontSize: 17,
    marginBottom: 15,
    marginLeft: 16,
  },
  tokensHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
    marginBottom: 15,
  },
  tokensList: {
    // paddingHorizontal: 16,
  },
  tokens: {
    color: COLORS.white,
    fontSize: 18,
  },
  seeAll: {
    color: COLORS.darkTextColor,
    fontSize: 14,
  },
  token: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokensText: {
    color: COLORS.white,
    fontSize: 18,
    marginLeft: 5,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.darkTextColor,
  },
  cards: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menu: {
    height: 210,
    paddingTop: 16,
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBackground,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  divider: {
    backgroundColor: COLORS.inActiveTabIcon,
    width: '100%',
    height: 0.6,
  },
  close: {
    alignItems: 'center',
    minHeight: 70,
  },
  menuHeading: {
    marginLeft: 16,
    fontSize: 12,
    letterSpacing: 0.5,
    color: COLORS.white,
  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  editText: {
    marginLeft: 22,
    fontSize: 14,
    color: COLORS.darkTextColor,
  },
  delete: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  deleteText: {
    marginLeft: 22,
    color: COLORS.linkColor,
    fontSize: 14,
  },
  closeText: {
    fontSize: 14,
    color: COLORS.white,
  },
});

export default styles;
