import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './DashboardScreenStyles';
import { COLORS } from '../../constants/colors';
import TextRegular from '../../components/TextWrappers/TextRegular';
import TextMedium from '../../components/TextWrappers/TextMedium';
import TokenCard from '../../components/TokenCard/TokenCard';
import AnalyticsCard from './AnalyticsCard/AnalyticsCard';
import TokenIcon from '../../assets/icons/token_placeholder.svg';
import TextBold from '../../components/TextWrappers/TextBold';
import RateIcon from '../../assets/icons/rate_card.svg';
import EuroIcon from '../../assets/icons/euro.svg';
import EquivalentIcon from '../../assets/icons/equivalent.svg';
import AvailableIcon from '../../assets/icons/available.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTokens } from '../../store/actions/tokens';
import Loader from '../../components/Loader/Loader';
import PendingTransaction from './PendingTransaction/PendingTransaction';
import Modal from 'react-native-modal';
import TextLight from '../../components/TextWrappers/TextLight';
import EditIcon from '../../assets/icons/penIcon.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import {
  deleteTransaction,
  getTransactionDocuments,
} from '../../store/actions/transactions';
import { getPendingTransactions } from '../../store/actions/transactions';
import DeleteInvestmentModal from './DeleteInvestmentModal/DeleteInvestmentModal';
import I18n from 'i18n-js';

const DashboardScreen = ({ navigation }) => {
  const userTokens = useSelector(store => store.tokens.userTokens);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { pendingTransactions } = useSelector(store => store.transactions);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState();

  const getTokens = useCallback(async () => {
    setLoading(true);
    await dispatch(getUserTokens());
    setLoading(false);
  }, []);

  useEffect(() => {
    getTokens();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const onPress = id => {
    navigation.navigate('Investment', { id });
  };
  const isIOS = Platform.OS === 'ios';
  const setPaddingTop = () => {
    if (!isIOS) {
      return StatusBar.currentHeight;
    }
    return 0;
  };

  const handleEditTransaction = async () => {
    setIsOpenMenu(false);
    dispatch(getTransactionDocuments(selectedTransaction.id));
    navigation.navigate('EditInvestment', {
      id: userTokens[0].id,
      selectedTransaction,
    });
  };

  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const handleDeleteTransaction = async transactionId => {
    setLoading(true);
    await dispatch(deleteTransaction(selectedTransaction.id));
    setIsOpenDeleteModal(false);
    setIsOpenMenu(false);
    await dispatch(getPendingTransactions());
    setLoading(false);
  };

  return (
    <>
      <SafeAreaView style={[styles.container, { paddingTop: setPaddingTop() }]}>
        <ScrollView
          style={styles.tokensList}
          contentContainerStyle={{ paddingBottom: 60 }}>
          <TextRegular style={styles.heading}>
            {I18n.t('Analytics')}
          </TextRegular>
          <View style={styles.cards}>
            <AnalyticsCard>
              <AvailableIcon />
              <TextRegular style={styles.cardText}>
                {I18n.t('Available')}
              </TextRegular>
              <View style={styles.token}>
                <TokenIcon width={13} height={17} />
                <TextBold style={styles.tokensText}> 1 326</TextBold>
              </View>
            </AnalyticsCard>

            <AnalyticsCard>
              <EquivalentIcon />
              <TextRegular style={styles.cardText}>
                {I18n.t('Equivalent')}
              </TextRegular>
              <View style={styles.token}>
                <TextBold style={styles.tokensText}>€ 1 326</TextBold>
              </View>
            </AnalyticsCard>

            <AnalyticsCard>
              <RateIcon />
              <TextRegular style={styles.cardText}>
                {I18n.t('Interest Rate')}
              </TextRegular>
              <View style={styles.token}>
                <TextBold style={styles.tokensText}>13 %</TextBold>
              </View>
            </AnalyticsCard>

            <AnalyticsCard>
              <EuroIcon />
              <TextRegular style={styles.cardText}>
                {I18n.t('Received')}
              </TextRegular>
              <View style={styles.token}>
                <TextBold style={styles.tokensText}>€ 13</TextBold>
              </View>
            </AnalyticsCard>
          </View>
          <View style={styles.tokensHeading}>
            <TextRegular style={styles.headingTokens}>
              {I18n.t('Your Tokens')}
            </TextRegular>
          </View>
          {userTokens && userTokens[0] && (
            <TouchableOpacity
              key={userTokens[0].id}
              onPress={() => onPress(userTokens[0].id)}
              style={{ paddingHorizontal: 16 }}>
              <TokenCard token={userTokens[0]} />
            </TouchableOpacity>
          )}
          {!userTokens && (
            <TextRegular>{I18n.t('You got no tokens')}</TextRegular>
          )}
          {pendingTransactions && (
            <>
              <TextRegular style={styles.headingTokens}>
                {I18n.t('Active transaction')}
              </TextRegular>
              <PendingTransaction
                transaction={pendingTransactions}
                setSelectedTransaction={setSelectedTransaction}
                openMenu={() => setIsOpenMenu(true)}
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
      <Modal
        animationType='slide'
        transparent={true}
        isVisible={isOpenMenu}
        animationInTiming={300}
        animationOutTiming={500}
        backdropColor={COLORS.transparent}
        style={styles.modal}>
        <DeleteInvestmentModal
          isVisible={isOpenDeleteModal}
          handleClose={() => setIsOpenDeleteModal(false)}
          handleDelete={handleDeleteTransaction}
        />
        <View style={styles.menu}>
          <TextLight style={styles.menuHeading}>
            {I18n.t('Active transaction')}
          </TextLight>
          <TouchableOpacity style={styles.edit} onPress={handleEditTransaction}>
            <EditIcon />
            <TextRegular style={styles.editText}>{I18n.t('Edit')}</TextRegular>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            onPress={handleOpenDeleteModal}>
            <TrashIcon />
            <TextMedium style={styles.deleteText}>
              {I18n.t('Delete')}
            </TextMedium>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.close}
            onPress={() => setIsOpenMenu(false)}>
            <TextRegular style={styles.closeText}>
              {I18n.t('Close')}
            </TextRegular>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default DashboardScreen;
