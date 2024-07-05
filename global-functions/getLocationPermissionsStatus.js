import React from 'react';
import * as Lib from '../custom-files/Lib';

const getLocationPermissionsStatus = async () => {
  const { status } = await Lib.Location.getForegroundPermissionsAsync();

  return status;
};

export default getLocationPermissionsStatus;
