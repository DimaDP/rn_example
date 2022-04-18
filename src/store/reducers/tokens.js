import {
  GET_SELECTED_PROPERTY,
  GET_TOKEN_BY_ID,
  GET_TOKEN_PROPERTIES,
  GET_TOKENS_HOME_SCREEN,
  GET_USER_TOKENS,
  LOADING_TOKENS,
} from '../types';

const initialState = {
  loading: false,
  homeTokens: null,
  userTokens: null,
  propertiesByToken: null,
  tokenById: null,
  selectedProperty: null,
};

const tokens = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING_TOKENS:
      return {
        ...state,
        loading: true,
      };
    case GET_TOKENS_HOME_SCREEN:
      return {
        ...state,
        homeTokens: payload,
        loading: false,
      };
    case GET_USER_TOKENS:
      return {
        ...state,
        userTokens: payload,
        loading: false,
      };
    case GET_TOKEN_PROPERTIES:
      return {
        ...state,
        propertiesByToken: payload,
      };
    case GET_TOKEN_BY_ID:
      return {
        ...state,
        tokenById: payload,
        loading: false,
      };
    case GET_SELECTED_PROPERTY:
      return {
        ...state,
        selectedProperty: payload,
      };
    default:
      return state;
  }
};

export default tokens;
