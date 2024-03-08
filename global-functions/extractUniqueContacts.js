import React from 'react';

const extractUniqueContacts = arr => {
  const users = (arr || []).reduce((acc, block) => {
    if (block._user) {
      acc[block._user.id] = block._user;
    }
    return acc;
  }, {});

  return Object.values(users);
};

export default extractUniqueContacts;
