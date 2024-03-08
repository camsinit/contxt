import React from 'react';
import * as Lib from '../custom-files/Lib';

const requestContactsPermissions = async () => {
  const { status } = await Lib.Contacts.requestPermissionsAsync();

  return status;
};

export default requestContactsPermissions;
