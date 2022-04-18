import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultConfig from '../constants/default';

const TIMEOUT = 0;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = defaultConfig.port;

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = async config => {
    const token = JSON.parse(await AsyncStorage.getItem('TOKEN'));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = response => response;
  const onResponseError = err => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 401) {
      AsyncStorage.setItem('TOKEN', JSON.stringify(null));
      onUnauthenticated();
    }
    if (status === 403) {
      console.warn('error 403 access rights');
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
