import React from 'react';
import * as Lib from '../custom-files/Lib';

const getContacts = async () => {
  const { data } = await Lib.Contacts.getContactsAsync({
    fields: [
      Lib.Contacts.Fields.Emails,
      Lib.Contacts.Fields.PhoneNumbers,
      Lib.Contacts.Fields.Image,
    ],
  });

  return data.map(contact => {
    return {
      ...contact,
      phoneNumbers: (contact?.phoneNumbers || []).map(c =>
        c.number.replace(/[+()-\s]/g, '')
      ),
    };
  });
};

export default getContacts;
