import React from 'react';

const formatDate = timestamp => {
  // Create a date object from the timestamp
  const date = new Date(timestamp);

  // Define an array of month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get the year, month, and day from the date object
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  // Format the date string
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};

export default formatDate;
