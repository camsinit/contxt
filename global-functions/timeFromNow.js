import React from 'react';
import * as Lib from '../custom-files/Lib';

const timeFromNow = timestamp => {
  // Get the current time
  let now = Lib.moment();

  // Determine the difference between the current time and the timestamp
  let diff = now.diff(Lib.moment(timestamp));

  // Convert the difference into a duration
  let duration = Lib.moment.duration(diff);

  // Check each unit of time in order of largest to smallest and return the first non-zero unit found
  if (duration.years() > 0) {
    return `${duration.years()} yr`;
  }
  if (duration.months() > 0) {
    return `${duration.months()} mo`;
  }
  if (duration.days() > 0) {
    return `${duration.days()} day`;
  }
  if (duration.hours() > 0) {
    return `${duration.hours()} hr`;
  }
  if (duration.minutes() > 0) {
    return `${duration.minutes()} min`;
  }
  if (duration.seconds() > 0) {
    return `${duration.seconds()} sec`;
  }

  return '0 sec';
};

export default timeFromNow;
