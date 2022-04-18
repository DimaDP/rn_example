import React, { useEffect, useState } from 'react';
import AppContainer from './src/navigation/AppContainer';
import DisconnectModal from './src/components/DisconnectModal/DisconnectModal';
import * as NetInfo from '@react-native-community/netinfo';
import * as Sentry from '@sentry/react-native';
import { showAllValues } from './src/utils/asyncStorage';

Sentry.init({
  dsn: 'https://03805e8ebd714ee5b22f6e49ae55e149@o1114345.ingest.sentry.io/6146248',
  debug: true,
  enableOutOfMemoryTracking: false,
  release: '1.0.8',
  maxBreadcrumbs: 50,
});

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  showAllValues();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  };

  return (
    <>
      <DisconnectModal
        handleClose={handleConnection}
        isVisible={!isConnected}
      />
      <AppContainer />
    </>
  );
};

export default App;
