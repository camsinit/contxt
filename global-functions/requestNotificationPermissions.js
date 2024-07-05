import React from 'react';
import * as Lib from '../custom-files/Lib';

const requestNotificationPermissions = async () => {
  const { status } = await Lib.Notifications.requestPermissionsAsync();

  return status;
};

export default requestNotificationPermissions;
