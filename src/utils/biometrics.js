import {
  hasHardwareAsync,
  supportedAuthenticationTypesAsync,
} from 'expo-local-authentication';

const biometricsAuth = async () => {
  // Starter function
};

export const checkCompatibility = async () => {
  return await hasHardwareAsync();
};

export const checkAvailableAuthTypes = async () => {
  return await supportedAuthenticationTypesAsync();
};

export default biometricsAuth;
