import * as Sentry from '@sentry/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const handleSentry = async (error, api) => {
  try {
    let decoded;
    const userToken = await AsyncStorage.getItem('TOKEN');
    if (userToken) {
      decoded = jwtDecode(userToken);
    }

    Sentry.captureException(error, {
      tags: {
        api,
        userLogin: decoded.sub || 'not authorized',
      },
    });
  } catch {
    Sentry.captureException(error, {
      tags: {
        api,
        userLogin: 'not authorized',
      },
    });
  }
};

export default handleSentry;
