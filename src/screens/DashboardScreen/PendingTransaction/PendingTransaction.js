import React from 'react';
import TextRegular from '../../../components/TextWrappers/TextRegular';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import TextMedium from '../../../components/TextWrappers/TextMedium';
import { formatDateForTransactions } from '../../../utils/date';
import MenuIcon from '../../../assets/icons/more-vert.svg';

const TransactionTypes = {
  INVESTING: 'investing',
  TOP_UP: 'Top Up',
  WITHDRAW: 'withdraw',
  CANCELED_INVESTING: 'Canceled Investing',
};

const PendingTransaction = ({
  transaction,
  openMenu,
  setSelectedTransaction,
}) => {
  const { status, amount, unix, currency, transactionType } = transaction;

  const handleSelect = () => {
    setSelectedTransaction(transaction);
    openMenu();
  };

  return (
    <View style={styles.card}>
      <View style={styles.investingData}>
        <View style={[styles.wrapper]}>
          <TextMedium style={styles.type}>
            {TransactionTypes[transactionType]}
          </TextMedium>
          <TextMedium style={styles.amount}>
            {currency} {amount}
          </TextMedium>
        </View>
        <View style={styles.wrapper}>
          <TextRegular style={styles.status}>{status}</TextRegular>
          <TextRegular style={styles.date}>
            {formatDateForTransactions(unix)}
          </TextRegular>
        </View>
      </View>
      <TouchableOpacity style={styles.menu} onPress={handleSelect}>
        <MenuIcon />
      </TouchableOpacity>
    </View>
  );
};

const width = Dimensions.get('window').width - 32;

const styles = StyleSheet.create({
  card: {
    width: width,
    height: 56,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 8,
    paddingLeft: 12,
    backgroundColor: COLORS.inputBackground,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  investingData: {
    paddingRight: 12,
    flex: 1,
    paddingVertical: 9,
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 14,
    color: COLORS.errorColor,
  },
  date: {
    fontSize: 12,
    color: COLORS.darkTextColor,
  },
  status: {
    fontSize: 12,
    color: COLORS.yellow,
    textTransform: 'capitalize',
  },
  type: {
    fontSize: 16,
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  menu: {
    borderColor: COLORS.inActiveTabIcon,
    borderLeftWidth: 0.4,
    width: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PendingTransaction;
