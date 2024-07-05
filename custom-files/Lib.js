import * as Contacts from 'expo-contacts';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import moment from 'moment';

const uniqid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
export { Contacts, Notifications, Location, uniqid, moment };
