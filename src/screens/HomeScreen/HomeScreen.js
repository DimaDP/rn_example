import React, { useCallback, useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './HomeScreenStyles';
import TokensChart from './TokensChart/TokensChart';
import TokenCard from '../../components/TokenCard/TokenCard';
import TextMedium from '../../components/TextWrappers/TextMedium';
import TextRegular from '../../components/TextWrappers/TextRegular';
import { useFocusEffect } from '@react-navigation/native';
import {
  setRouterColor,
  setStatusBarColor,
} from '../../store/actions/statusBar';
import { COLORS } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import SuccessStatus from './UserStatuses/SuccessStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KYCCard from './KYCCard/KYCCard';
import { getHomeTokens } from '../../store/actions/tokens';
import Loader from '../../components/Loader/Loader';
import { getTokensGraph } from '../../store/actions/graph';
import Incomplete from './UserStatuses/Incomplete';
import ReviewPending from './UserStatuses/ReviewPending';
import DeclineStatus from './UserStatuses/DeclineStatus';
import CouponRequested from './UserStatuses/CouponRequested';
import PendingTransaction from '../DashboardScreen/PendingTransaction/PendingTransaction';
import { getPendingTransactions } from '../../store/actions/transactions';
import { checkAuth } from '../../store/actions/authorization';
import useAppState from '../../hooks/useAppState';
import SuccessWithoutWallet from './UserStatuses/SuccessWithoutWallet';
import I18n from 'i18n-js';

const KycStatuses = {
  success: 'SUCCESS',
  declined: 'DECLINED',
  couponRequested: 'COUPON_REQUESTED',
  reviewPending: 'REVIEW_PENDING',
  incomplete: 'INCOMPLETE',
};

const HomeScreen = ({ navigation }) => {
  const { kycStatus, walletStatus } = useSelector(store => store.kyc);
  const { homeTokens } = useSelector(store => store.tokens);
  const { pendingTransactions } = useSelector(store => store.transactions);
  const [isShowGraph, setShownGraph] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const checkStatus = useCallback(async () => {
    const wasClosedSuccess = await AsyncStorage.getItem(
      'KYC_SUCCESS_WAS_CLOSED',
    );
    if (wasClosedSuccess === 'true') {
      setShownGraph(true);
    }
  });

  const appState = useAppState();

  useEffect(() => {
    if (appState === 'active') {
      dispatch(checkAuth());
    }
  }, [appState]);

  const getData = useCallback(async () => {
    setLoading(true);
    await dispatch(getHomeTokens());
    await dispatch(getTokensGraph());
    await dispatch(getPendingTransactions());
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    checkStatus();
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(setStatusBarColor(COLORS.mainBackground));
      dispatch(setRouterColor(COLORS.mainBackground));
    }, [dispatch]),
  );

  if (loading) {
    return <Loader />;
  }

  const isIOS = Platform.OS === 'ios';
  const setPaddingTop = () => {
    if (!isIOS) {
      return StatusBar.currentHeight;
    }
    return 0;
  };

  const navigateToTokens = () => navigation.navigate('Tokens');

  const handlePress = async () => {
    await AsyncStorage.setItem('KYC_SUCCESS_WAS_CLOSED', JSON.stringify(true));
    setShownGraph(true);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: setPaddingTop() }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}>
        <TextRegular style={styles.heading}>{I18n.t('Home')}</TextRegular>
        {isShowGraph && kycStatus === 'SUCCESS' ? (
          <TokensChart />
        ) : (
          kycStatus === 'SUCCESS' &&
          walletStatus === 'ACCEPTED' && (
            <SuccessStatus handlePress={handlePress} />
          )
        )}
        {kycStatus === 'SUCCESS' && walletStatus !== 'ACCEPTED' && (
          <SuccessWithoutWallet />
        )}
        {kycStatus === null && (
          <KYCCard onPress={() => navigation.navigate('Tokens')} />
        )}
        {kycStatus === 'INCOMPLETE' && <Incomplete />}
        {kycStatus === 'REVIEW_PENDING' && <ReviewPending />}
        {kycStatus === 'DECLINED' && <DeclineStatus />}
        {kycStatus === 'COUPON_REQUESTED' && <CouponRequested />}
        {/*{pendingTransactions && (*/}
        {/*  <>*/}
        {/*    <TextRegular style={styles.heading}>Active transaction</TextRegular>*/}
        {/*    /!*<PendingTransaction transaction={pendingTransactions} />*!/*/}
        {/*  </>*/}
        {/*)}*/}
        <View style={styles.tokensHeading}>
          <TextMedium style={styles.tokens}>{I18n.t('Tokens')}</TextMedium>
          <TouchableOpacity onPress={navigateToTokens}>
            <TextMedium style={styles.seeAll}>{I18n.t('See all')}</TextMedium>
          </TouchableOpacity>
        </View>
        <View style={styles.tokensList}>
          {homeTokens &&
            homeTokens.map(token => {
              return <TokenCard key={token.id} token={token} />;
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
