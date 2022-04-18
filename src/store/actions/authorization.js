import axios from 'axios';
import {
  ALERT_AUTHORIZATION,
  AUTH_LOADING,
  SET_IS_AUTHORIZED,
  SET_REDIRECT_URL,
  SET_USER_KYC_STATUS,
  SET_USER_WALLET_STATUS,
} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import handleSentry from '../../utils/handleSentry';

const setLoginLoading = payload => ({
  type: AUTH_LOADING,
  payload,
});

const alertAuth = payload => ({
  type: ALERT_AUTHORIZATION,
  payload,
});

export const setAuthorizationSuccess = (token, status) => async dispatch => {
  await AsyncStorage.setItem('TOKEN', JSON.stringify(token));
  dispatch({
    type: SET_IS_AUTHORIZED,
    payload: true,
  });
  dispatch({
    type: SET_USER_KYC_STATUS,
    payload: status.kycStatus,
  });
  dispatch({
    type: SET_USER_WALLET_STATUS,
    payload: status.walletStatus,
  });
  dispatch({
    type: SET_REDIRECT_URL,
    payload: status.redirectUrl,
  });
};

export const setAuthorizationFail = () => async dispatch => {
  await AsyncStorage.setItem('TOKEN', JSON.stringify(null));
  dispatch({
    type: SET_IS_AUTHORIZED,
    payload: false,
  });
};

export const login =
  ({ email, password }) =>
  async dispatch => {
    dispatch(setLoginLoading(true));
    try {
      const body = {
        username: email,
        password,
      };
      const { data } = await axios.post('', body);
      console.log(data);
      dispatch(setAuthorizationSuccess(data.id_token, data.userStatusDTO));
    } catch (e) {
      dispatch(alertAuth(e.message));
      handleSentry(e, '');
      setTimeout(() => {
        dispatch(alertAuth(null));
      }, 3000);
      dispatch(setAuthorizationFail());
    } finally {
      dispatch(setLoginLoading(false));
    }
  };

export const checkAuth = () => async dispatch => {
  dispatch(setLoginLoading(true));
  try {
    const { data } = await axios.get('');
    if (data.login !== 'anonymousUser') {
      dispatch({
        type: SET_IS_AUTHORIZED,
        payload: true,
      });
      dispatch({
        type: SET_USER_KYC_STATUS,
        payload: data.kycStatus,
      });
      dispatch({
        type: SET_REDIRECT_URL,
        payload: data.redirectUrl,
      });
      dispatch({
        type: SET_USER_WALLET_STATUS,
        payload: data.walletStatus,
      });
    } else {
      dispatch(setAuthorizationFail());
    }
  } catch (e) {
    handleSentry(e, '');
    dispatch(setAuthorizationFail());
  } finally {
    dispatch(setLoginLoading(false));
  }
};

export const register =
  ({ email, password }) =>
  async dispatch => {
    dispatch(setLoginLoading(true));
    try {
      const body = {
        email,
        password,
        login: email,
      };
      const response = await axios.post('', body);
      return response.data;
    } catch (e) {
      dispatch(alertAuth(e.message));
      handleSentry(e, '');
      setTimeout(() => {
        dispatch(alertAuth(null));
      }, 3000);
      dispatch(setAuthorizationFail());
      return false;
    } finally {
      dispatch(setLoginLoading(false));
    }
  };

export const activateAccount = code => async dispatch => {
  dispatch(setLoginLoading(true));
  try {
    await axios.get(``);
    return true;
  } catch (e) {
    dispatch(alertAuth(e.message));
    handleSentry(e, '');
    setTimeout(() => {
      dispatch(alertAuth(null));
    }, 3000);
    dispatch(setAuthorizationFail());
    return false;
  } finally {
    dispatch(setLoginLoading(false));
  }
};

export const resetPasswordInit =
  ({ email }) =>
  async dispatch => {
    dispatch(setLoginLoading(true));
    try {
      const body = {
        email,
      };
      const { data } = await axios.post(
        '',
        body,
      );
      return data;
    } catch (e) {
      dispatch(alertAuth(e.message));
      handleSentry(e, '');
      setTimeout(() => {
        dispatch(alertAuth(null));
      }, 3000);
      dispatch(setAuthorizationFail());
      return false;
    } finally {
      dispatch(setLoginLoading(false));
    }
  };

export const confirmResetPasswordByCode =
  ({ code, newPassword }) =>
  async dispatch => {
    dispatch(setLoginLoading(true));
    try {
      const body = {
        key: code,
        newPassword,
      };
      await axios.post('', body);
      return true;
    } catch (e) {
      dispatch(alertAuth(e.message));
      handleSentry(e, '');
      setTimeout(() => {
        dispatch(alertAuth(null));
      }, 3000);
      dispatch(setAuthorizationFail());
      return false;
    } finally {
      dispatch(setLoginLoading(false));
    }
  };
