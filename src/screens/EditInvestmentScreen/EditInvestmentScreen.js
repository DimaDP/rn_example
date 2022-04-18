import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { styles } from './EditInvestmentsScrenStyles';
import TokenCard from '../../components/TokenCard/TokenCard';
import TextBold from '../../components/TextWrappers/TextBold';
import ButtonShared from '../../components/ButtonShared';
import KeyboardWrapper from '../../components/KeyboardWrapper/KeyboardWrapper';
import { useDispatch, useSelector } from 'react-redux';
import Buy from '../InvestementScreen/InvestmentTabs/Buy';
import KYCModal from '../../components/KYCModal/KYCModal';
import { useFocusEffect } from '@react-navigation/native';
import {
  setRouterColor,
  setStatusBarColor,
} from '../../store/actions/statusBar';
import { COLORS } from '../../constants/colors';
import { getUserKYCInformation } from '../../store/actions/kyc';
import { editTransaction } from '../../store/actions/transactions';
import I18n from 'i18n-js';

const EditInvestmentScreen = ({ navigation, route }) => {
  const userTokens = useSelector(store => store.tokens.userTokens);
  const dispatch = useDispatch();
  const [currentTabName] = useState('buy');
  const [isOpenKycModal, setIsOpenKycModal] = useState(false);
  const { selectedTransaction } = route.params;
  const [amount, setAmount] = useState(selectedTransaction.amount + '');

  useFocusEffect(
    useCallback(() => {
      dispatch(setStatusBarColor(COLORS.mainBackground));
      dispatch(setRouterColor(COLORS.mainBackground));
    }, [dispatch]),
  );

  const handleKYCModal = async () => {
    await dispatch(editTransaction(selectedTransaction.id, amount));
    await dispatch(getUserKYCInformation());
    setIsOpenKycModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KYCModal
        tokenId={route.params.id}
        handleClose={() => setIsOpenKycModal(false)}
        isVisible={isOpenKycModal}
        isEdit
      />
      <KeyboardWrapper style={{ paddingHorizontal: 0 }}>
        <ScrollView style={[styles.container, { paddingVertical: 20 }]}>
          <View style={{ paddingHorizontal: 16 }}>
            {userTokens
              ?.filter(token => token.id === route.params.id)
              .map(token => (
                <TokenCard key={token.id} token={token} />
              ))}
          </View>
          {currentTabName === 'buy' && (
            <Buy amount={amount} setAmount={setAmount} />
          )}
        </ScrollView>
        <ButtonShared
          disabled={+amount === +selectedTransaction.amount || !amount}
          style={styles.buttonSubmitBuy}
          onPress={handleKYCModal}>
          <TextBold style={styles.buttonSubmitBuyText}>
            {I18n.t('Save Changes')}
          </TextBold>
        </ButtonShared>
      </KeyboardWrapper>
    </SafeAreaView>
  );
};

export default EditInvestmentScreen;
