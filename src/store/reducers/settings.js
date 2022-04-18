import { GET_FAQ, GET_TERMS, GET_USER_INFO, SETTINGS_LOADING } from '../types';

const initialState = {
  terms: null,
  faq: null,
  loading: false,
  userInfo: null,
  isLoading: false,
};

const settings = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_TERMS:
      return {
        ...state,
        terms: payload,
      };
    case GET_FAQ:
      return {
        ...state,
        faq: payload,
      };
    case SETTINGS_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: payload,
      };
    default:
      return state;
  }
};

export default settings;
