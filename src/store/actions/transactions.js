import {
  GET_PENDING_TRANSACTIONS,
  GET_TRANSACTION_DOCS,
  LOADING_TRANSACTIONS,
} from '../types';
import axios from 'axios';
import handleSentry from '../../utils/handleSentry';

export const getPendingTransactions = () => async dispatch => {
  try {
    dispatch({
      type: LOADING_TRANSACTIONS,
      payload: true,
    });
    const body = {
      // query: 'string',
      // month: 0-11
    };

    const { data } = await axios.post(
      '',
      body,
    );
    dispatch({
      type: GET_PENDING_TRANSACTIONS,
      payload: data[0],
    });
  } catch (e) {
    handleSentry(e, '');
  } finally {
    dispatch({
      type: LOADING_TRANSACTIONS,
      payload: false,
    });
  }
};

export const editTransaction = (transactionId, amount) => async dispatch => {
  try {
    dispatch({
      type: LOADING_TRANSACTIONS,
      payload: true,
    });
    const response = await axios.put(
      ``,
      {},
    );
  } catch (e) {
    handleSentry(
      e,
      ``,
    );
  } finally {
    dispatch({
      type: LOADING_TRANSACTIONS,
      payload: false,
    });
  }
};

export const deleteTransaction = transactionId => async dispatch => {
  dispatch({
    type: LOADING_TRANSACTIONS,
    payload: true,
  });
  try {
    axios.delete(``);
  } catch (e) {
    handleSentry(e, ``);
  } finally {
    dispatch({
      type: LOADING_TRANSACTIONS,
      payload: false,
    });
  }
};

export const getTransactionDocuments = transactionId => async dispatch => {
  dispatch({
    type: LOADING_TRANSACTIONS,
    payload: true,
  });
  try {
    const { data } = await axios.get(``);
    dispatch({
      type: GET_TRANSACTION_DOCS,
      payload: data,
    });
  } catch (e) {
    handleSentry(e, ``);
  } finally {
    dispatch({
      type: LOADING_TRANSACTIONS,
      payload: false,
    });
  }
};
