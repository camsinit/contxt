import React from 'react';
import * as Lib from '../custom-files/Lib';

const getContactPermissionsStatus = async () => {
  const { status } = await Lib.Contacts.getPermissionsAsync();

  return status;
};

export default getContactPermissionsStatus;
