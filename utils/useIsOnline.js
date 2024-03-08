import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

const useIsOnline = () => {
  const netInfo = useNetInfo();

  return netInfo.type !== 'unknown' && netInfo.isConnected;
};

export default useIsOnline;
