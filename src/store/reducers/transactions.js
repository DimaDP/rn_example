import { GET_PENDING_TRANSACTIONS, GET_TRANSACTION_DOCS } from '../types';

const initialState = {
  pendingTransactions: null,
  documents: null,
};

const transactions = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PENDING_TRANSACTIONS:
      return {
        ...state,
        pendingTransactions: payload,
      };
    case GET_TRANSACTION_DOCS:
      return {
        ...state,
        documents: payload,
      };
    default:
      return state;
  }
};

export default transactions;
