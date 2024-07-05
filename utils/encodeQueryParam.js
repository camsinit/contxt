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

const isUrlEncoded = s => {
  if (typeof s !== 'string' || !s.match(/%[0-9A-F][0-9A-F]/)) {
    return false;
  }
  try {
    const decoded = decodeURIComponent(s);
    return decoded !== s;
  } catch (_e) {
    return false;
  }
};

export const encodeQueryParam = param => {
  if (isIos17OrNewer || isUrlEncoded(param)) {
    return param;
  } else {
    return encodeURIComponent(param);
  }
};

export const renderParam = value =>
  typeof value === 'string' ? value : JSON.stringify(value);

export const renderQueryString = paramsDict => {
  const filtered = Object.entries(paramsDict).filter(kv => kv[1] !== undefined);
  const queries = filtered.map(
    ([k, v]) => `${encodeQueryParam(k)}=${encodeQueryParam(v)}`
  );
  return !queries.length ? '' : '?' + queries.join('&');
};

export default encodeQueryParam;
