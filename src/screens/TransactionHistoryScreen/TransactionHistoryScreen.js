import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import styles from './TransactionHistoryScreenStyles';
import TextRegular from '../../components/TextWrappers/TextRegular';
import { COLORS } from '../../constants/colors';
import TextMedium from '../../components/TextWrappers/TextMedium';
import EmptyImage from '../../assets/images/emty.svg';

const data = [
  {
    date: 'Today, Dec 20',
    investing: {
      status: 'success',
      sum: 128598.05,
      time: 'DD/MM/YY',
    },
    topUp: {
      status: 'success',
      sum: -328598.05,
      time: 'DD/MM/YY',
    },
  },
  {
    date: 'Yesterday, Dec 19',
    investing: {
      status: 'success',
      sum: -128598.05,
      time: 'DD/MM/YY',
    },
    topUp: {
      status: 'success',
      sum: -328598.05,
      time: 'DD/MM/YY',
    },
  },
  {
    date: 'Dec 18',
    investing: {
      status: 'success',
      sum: 128598.05,
      time: 'DD/MM/YY',
    },
    topUp: {
      status: 'success',
      sum: -328598.05,
      time: 'DD/MM/YY',
    },
  },
];

const TransactionHistoryScreen = () => {
  const stringifySum = sum => {
    if (sum > 0) {
      return '+ ' + Math.abs(sum);
    }
    return '- ' + Math.abs(sum);
  };

  if (data.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.empty}>
          <EmptyImage />
          <TextRegular style={styles.emptyHeading}>
            Your transactions history is empty!
          </TextRegular>
          <TextRegular style={styles.emptyText}>
            Here you can check all your activity
          </TextRegular>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {data.map(day => {
          return (
            <View style={styles.day} key={day.date}>
              <TextRegular style={styles.dayHeading}>{day.date}</TextRegular>
              {Object.entries(day).map((action, idx) => {
                if (action[0] === 'date') {
                  return null;
                }
                return (
                  <View style={styles.action} key={idx}>
                    <View style={styles.operation}>
                      <TextMedium style={styles.operationName}>
                        {action[0]}
                      </TextMedium>
                      <TextRegular
                        style={{
                          ...styles.operationValue,
                          color:
                            action[1].sum > 0
                              ? COLORS.positiveSum
                              : COLORS.errorColor,
                        }}>
                        {stringifySum(action[1].sum)}
                      </TextRegular>
                    </View>
                    <View style={styles.operation}>
                      <TextRegular style={styles.operationStatus}>
                        {action[1].status}
                      </TextRegular>
                      <TextRegular style={styles.operationDate}>
                        {action[1].time}
                      </TextRegular>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionHistoryScreen;
