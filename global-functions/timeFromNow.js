import React from 'react';
import * as Lib from '../custom-files/Lib';

const timeFromNow = timestamp => {
  return Lib.moment(timestamp).fromNow();
};

export default timeFromNow;
