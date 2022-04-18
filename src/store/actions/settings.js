import axios from 'axios';
import { GET_FAQ, GET_TERMS, GET_USER_INFO, SETTINGS_LOADING } from '../types';
import handleSentry from '../../utils/handleSentry';

export const getTerms = () => async dispatch => {
  dispatch({
    type: SETTINGS_LOADING,
    payload: true,
  });
  try {
    const { data } = await axios.get('');
    dispatch({
      type: GET_TERMS,
      payload: data,
    });
  } catch (e) {
    handleSentry(e, '');
  } finally {
    dispatch({
      type: SETTINGS_LOADING,
      payload: false,
    });
  }
};

export const getFAQ = () => async dispatch => {
  try {
    const { data } = await axios.get('');
    dispatch({
      type: GET_FAQ,
      payload: data,
    });
  } catch (e) {
    handleSentry(e, '');
  }
};

export const changePassword = body => async dispatch => {
  try {
    dispatch({
      type: SETTINGS_LOADING,
      payload: true,
    });
    const { data } = await axios.post('', body);
    console.log(data);
    return true;
  } catch (e) {
    handleSentry(e, '');
  } finally {
    dispatch({
      type: SETTINGS_LOADING,
      payload: false,
    });
  }
};

export const getUserInfo = () => async dispatch => {
  try {
    dispatch({
      type: SETTINGS_LOADING,
      payload: true,
    });
    const { data } = await axios.get('');
    console.log(data);
    dispatch({
      type: GET_USER_INFO,
      payload: data,
    });
  } catch (e) {
    handleSentry(e, '');
  } finally {
    dispatch({
      type: SETTINGS_LOADING,
      payload: false,
    });
  }
};

export const setUserInfo = body => async dispatch => {
  try {
    dispatch({
      type: SETTINGS_LOADING,
      payload: true,
    });
    await axios.post('', body);
  } catch (e) {
    handleSentry(e, '');
  } finally {
    dispatch({
      type: SETTINGS_LOADING,
      payload: false,
    });
  }
};
