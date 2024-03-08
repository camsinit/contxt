import React from 'react';

const formatPhoneNumbers = phoneNumberString => {
  console.log(phoneNumberString);

  let cleaned = ('' + phoneNumberString).replace(/\D/g, '');

  // Handle 12-digit international format
  let match12 = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match12) {
    return (
      '+' +
      match12[1] +
      ' (' +
      match12[2] +
      ') ' +
      match12[3] +
      ' ' +
      match12[4] +
      ' ' +
      match12[5]
    );
  }

  // Handle 11-digit format with leading '0'
  let match11 = cleaned.match(/^0(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match11) {
    // Remove the country code assumption, just format based on the remaining digits
    return (
      '(' + match11[1] + ') ' + match11[2] + ' ' + match11[3] + ' ' + match11[4]
    );
  }

  match11 = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match11) {
    // Apply a generic format that can work for various cases
    return (
      match11[1] +
      ' (' +
      match11[2] +
      ') ' +
      match11[3] +
      ' ' +
      match11[4] +
      '-' +
      match11[5]
    );
  }

  // Handle 10-digit national format
  let match10 = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match10) {
    return '(' + match10[1] + ') ' + match10[2] + '-' + match10[3];
  }

  return phoneNumberString;
};

export default formatPhoneNumbers;
