import axios from 'axios';
import handleSentry from '../../utils/handleSentry';
import {
  ALERT_KYC,
  GET_COUNTRIES,
  GET_KYC_DOCS,
  GET_USER_EXPERIENCE,
  KYC_LOADING,
  SET_INVESTMENT_ID,
  SET_REDIRECT_URL,
  SET_USER_EXPERIENCE,
  SET_USER_KYC_DATA,
  SET_USER_KYC_STATUS,
  SET_USER_WALLET_STATUS,
} from '../types';

const setLoginLoading = payload => ({
  type: KYC_LOADING,
  payload,
});

const alertAuth = payload => ({
  type: ALERT_KYC,
  payload,
});

export const getCountries = () => async dispatch => {
  try {
    const response = await axios.get('');
    dispatch({
      type: GET_COUNTRIES,
      payload: response.data,
    });
  } catch (e) {
    handleSentry(e, '');
  }
};

export const setKYCdata = payload => ({
  type: SET_USER_KYC_DATA,
  payload,
});

export const getUserKYCInformation = () => async dispatch => {
  dispatch(setLoginLoading(true));
  try {
    const { data } = await axios.get('');
    dispatch(setKYCdata(data));
  } catch (e) {
    dispatch(alertAuth(e.message));
    handleSentry(e, '');
    setTimeout(() => {
      dispatch(alertAuth(null));
    }, 3000);
  } finally {
    dispatch(setLoginLoading(false));
  }
};

export const KYCFirstStep =
  (personalInformation, tokenId, amount) => async dispatch => {
    dispatch(setLoginLoading(true));
    try {
      const { data } = await axios.post(
        ``,
        personalInformation,
      );
      // dispatch({
      //   type: SET_REDIRECT_URL,
      //   payload: data.kycStatus.redirectUrlWeb,
      // });
      dispatch({
        type: SET_USER_WALLET_STATUS,
        payload: data.kycStatus.walletStatus,
      });
      dispatch({
        type: SET_USER_KYC_STATUS,
        payload: data.kycStatus.kycStatus,
      });
      dispatch({
        type: SET_INVESTMENT_ID,
        payload: data.investmentRequestId,
      });
    } catch (e) {
      console.log('e', e);
      dispatch(alertAuth(e.message));
      handleSentry(e, ``);
      setTimeout(() => {
        dispatch(alertAuth(null));
      }, 3000);
    } finally {
      dispatch(setLoginLoading(false));
    }
  };

export const getUserExperience = () => async dispatch => {
  try {
    const { data } = await axios.get('');
    dispatch({
      type: GET_USER_EXPERIENCE,
      payload: data,
    });
  } catch (e) {
    dispatch(alertAuth(e.message));
    handleSentry(e, '');
    setTimeout(() => {
      dispatch(alertAuth(null));
    }, 3000);
  } finally {
    dispatch(setLoginLoading(false));
  }
};

export const setUserExperience = item => dispatch => {
  dispatch({
    type: SET_USER_EXPERIENCE,
    payload: item,
  });
};

export const postUserExperience = experience => async dispatch => {
  setLoginLoading(true);
  try {
    await axios.put('', experience);
  } catch (e) {
    dispatch(alertAuth(e.message));
    handleSentry(e, '');
    setTimeout(() => {
      dispatch(alertAuth(null));
    }, 3000);
  } finally {
    dispatch(setLoginLoading(false));
  }
};

export const getKycDocs = transactionId => async dispatch => {
  setLoginLoading(true);
  try {
    const { data } = await axios.get(``);
    dispatch({
      type: GET_KYC_DOCS,
      payload: data,
    });
  } catch (e) {
    dispatch(alertAuth(e.message));
    handleSentry(e, ``);
    setTimeout(() => {
      dispatch(alertAuth(null));
    }, 3000);
  } finally {
    dispatch(setLoginLoading(false));
  }
};

export const confirmTransaction = transactionId => async dispatch => {
  setLoginLoading(true);
  try {
    const { data } = await axios.put(
      ``,
    );
    dispatch({
      type: SET_REDIRECT_URL,
      payload: data.kycStatus.redirectUrlWeb,
    });
    dispatch({
      type: SET_USER_WALLET_STATUS,
      payload: data.kycStatus.walletStatus,
    });
    dispatch({
      type: SET_USER_KYC_STATUS,
      payload: data.kycStatus.kycStatus,
    });
  } catch (e) {
    dispatch(alertAuth(e.message));
    handleSentry(e, ``);
    setTimeout(() => {
      dispatch(alertAuth(null));
    }, 3000);
  } finally {
    setLoginLoading(false);
  }
};
