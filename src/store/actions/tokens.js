import axios from 'axios';
import {
  GET_SELECTED_PROPERTY,
  GET_TOKEN_BY_ID,
  GET_TOKEN_PROPERTIES,
  GET_TOKENS_HOME_SCREEN,
  GET_USER_TOKENS,
  LOADING_TOKENS,
} from '../types';
import handleSentry from '../../utils/handleSentry';

export const getHomeTokens = () => async dispatch => {
  try {
    const { data } = await axios.get(``);
    dispatch({
      type: GET_TOKENS_HOME_SCREEN,
      payload: data,
    });
  } catch (e) {
    handleSentry(e, '');
  }
};

export const getUserTokens = () => async dispatch => {
  try {
    const { data } = await axios.get('');
    dispatch({
      type: GET_USER_TOKENS,
      payload: data,
    });
  } catch (e) {
    handleSentry(e, '');
  }
};

export const getTokenProperties = tokenId => async dispatch => {
  try {
    const { data } = await axios.get(``);
    dispatch({
      type: GET_TOKEN_PROPERTIES,
      payload: data,
    });
  } catch (e) {
    handleSentry(e, ``);
  }
};

export const getPropertyById = propertyId => async dispatch => {
  try {
    const { data } = await axios.get(``);
    dispatch({
      type: GET_SELECTED_PROPERTY,
      payload: data,
    });
  } catch (e) {
    handleSentry(e, ``);
  }
};

export const byTokensById = (tokenId, body) => async dispatch => {
  try {
    const { data } = await axios.put(``, body);
  } catch (e) {
    handleSentry(e, ``);
  }
};

export const getTokenById = id => async dispatch => {
  dispatch({
    type: LOADING_TOKENS,
  });
  try {
    const { data } = await axios.get(``);
    dispatch({
      type: GET_TOKEN_BY_ID,
      payload: data,
    });
  } catch (e) {
    handleSentry(e, ``);
  }
};
