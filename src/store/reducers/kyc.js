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
import I18n from 'i18n-js';

const initialState = {
  loading: false,
  redirectUrlWeb: null,
  alert: null,
  countries: [],
  kycStatus: null,
  userKYCData: null,
  walletStatus: null,
  userExperience: null,
  documents: null,
  currentTransactionId: null,
};

const kyc = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case KYC_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case SET_REDIRECT_URL:
      return {
        ...state,
        redirectUrlWeb: payload,
      };
    case ALERT_KYC:
      return {
        ...state,
        alert: payload,
      };
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload.map(country => ({
          label: `${country.flag} ${country.name}`,
          value: country.shortName,
          flag: country.flag,
          id: country.id,
        })),
      };
    case SET_USER_KYC_STATUS:
      return {
        ...state,
        kycStatus: payload,
      };
    case SET_USER_KYC_DATA:
      return {
        ...state,
        userKYCData: {
          ...payload,
          employmentType: payload.employmentType.map((item, idx) => ({
            ...item,
            id: idx,
            label: I18n.t(item.value),
          })),
          educationLevel: payload.educationLevel.map((item, idx) => ({
            ...item,
            id: idx,
            label: I18n.t(item.value),
          })),
          idType: payload.idType.map((item, idx) => ({
            ...item,
            id: idx,
            label: I18n.t(item.value),
          })),
        },
      };
    case SET_USER_WALLET_STATUS:
      return {
        ...state,
        walletStatus: payload,
      };
    case GET_USER_EXPERIENCE:
      return {
        ...state,
        userExperience: Object.entries(payload).map(item => [
          item[0],
          item[1].map((option, idx) => {
            return {
              ...option,
              label: I18n.t(option.value),
              id: idx,
            };
          }),
        ]),
      };
    case SET_USER_EXPERIENCE: {
      const mapped = state.userExperience.map(item => {
        if (item[0] === payload[0]) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        userExperience: mapped,
      };
    }
    case GET_KYC_DOCS:
      return {
        ...state,
        documents: payload,
      };
    case SET_INVESTMENT_ID:
      return {
        ...state,
        currentTransactionId: payload,
      };
    default:
      return state;
  }
};

export default kyc;
