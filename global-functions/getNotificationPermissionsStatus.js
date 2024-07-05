import React from 'react';
import * as Lib from '../custom-files/Lib';

const getNotificationPermissionsStatus = async () => {
  const { status } = await Lib.Notifications.getPermissionsAsync();

  return status;
};

export default getNotificationPermissionsStatus;
