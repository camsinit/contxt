import React from 'react';

const cleanNumber = number => {
  return number?.replace(/[+()-\s]/g, '');
};

export default cleanNumber;
