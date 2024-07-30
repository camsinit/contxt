import * as DateFns from 'date-fns';

export const addSeconds = (d, n = 0) => DateFns.addSeconds(new Date(d), n);
export const addMinutes = (d, n = 0) => DateFns.addMinutes(new Date(d), n);
export const addHours = (d, n = 0) => DateFns.addHours(new Date(d), n);
export const addDays = (d, n = 0) => DateFns.addDays(new Date(d), n);
export const addWeeks = (d, n = 0) => DateFns.addWeeks(new Date(d), n);
export const addMonths = (d, n = 0) => DateFns.addMonths(new Date(d), n);
export const addYears = (d, n = 0) => DateFns.addYears(new Date(d), n);
export const format = (d, f) =>
  f
    ? DateFns.format(new Date(d), f.replace(/YY/g, 'yy').replace(/D/g, 'd'))
    : d.toString();
export const formatDistanceToNow = d =>
  DateFns.formatDistanceToNow(new Date(d));
