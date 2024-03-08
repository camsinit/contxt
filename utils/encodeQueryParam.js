import { Platform } from 'react-native';
import { osVersion } from 'expo-device';

/*
 * IOS 17 introduces new automatic encoding rules that leads to double encoding
 * when encoding is done on the JS level, this skips encoding for devices with
 * IOS 17 or higher.
 * https://forums.developer.apple.com/forums/thread/738432
 * https://github.com/axios/axios/issues/6102
 * https://github.com/facebook/react-native/issues/39793
 */

let isIos17OrNewer = false;
if (Platform.OS === 'ios') {
  const splitVersion = osVersion.split('.');
  if (splitVersion.length > 0) {
    const majorVersion = Number(splitVersion[0]);
    isIos17OrNewer = typeof majorVersion === 'number' && majorVersion >= 17;
  }
}

const encodeQueryParam = param => {
  if (isIos17OrNewer) {
    return param;
  } else {
    return encodeURIComponent(param);
  }
};

export default encodeQueryParam;
