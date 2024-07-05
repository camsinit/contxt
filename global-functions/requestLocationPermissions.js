import React from 'react';
import * as Lib from '../custom-files/Lib';

const requestLocationPermissions = async () => {
  const { status } = await Lib.Location.requestPermissionsAsync();

  return status;
};

export default requestLocationPermissions;
