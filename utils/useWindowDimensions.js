import React from 'react';
import {
  useWindowDimensions as useDefaultWindowDimensions,
  Platform,
} from 'react-native';

/**
 * On web, the default implementation of `useWindowDimensions` returns dimensions excluding the scroll bar size
 * which causes inconsistencies with breakpoints, this ensures scroll bars do not affect the values of `useWindowDimensions`
 */
const useWindowDimensions = () => {
  const dimensions = useDefaultWindowDimensions();

  if (Platform.OS === 'web') {
    return {
      ...dimensions,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  return dimensions;
};

export default useWindowDimensions;
