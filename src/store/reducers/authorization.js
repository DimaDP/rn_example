import { ALERT_AUTHORIZATION, AUTH_LOADING, SET_IS_AUTHORIZED } from '../types';

const initialState = {
  loading: false,
  isAuthorized: false,
  alert: null,
};

const authorization = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case SET_IS_AUTHORIZED:
      return {
        ...state,
        isAuthorized: payload,
      };
    case ALERT_AUTHORIZATION:
      return {
        ...state,
        alert: payload,
      };
    default:
      return state;
  }
};

export default authorization;
