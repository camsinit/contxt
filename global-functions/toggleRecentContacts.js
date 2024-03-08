import React from 'react';

const toggleRecentContacts = (Variables, setGlobalVariableValue, contact) => {
  let recent_contacts = Variables?.RECENT_CONTACTS || [];

  if (!recent_contacts.map(c => c.id).includes(contact.id)) {
    recent_contacts = recent_contacts.filter(c => c.id !== contact.id);

    if (recent_contacts.length >= 3) {
      recent_contacts.pop();
    }
    recent_contacts.unshift(contact);
    setGlobalVariableValue({
      key: 'RECENT_CONTACTS',
      value: recent_contacts,
    });
  }
};

export default toggleRecentContacts;
