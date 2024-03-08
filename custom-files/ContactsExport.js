import React, { useEffect } from 'react';
import * as Contacts from 'expo-contacts';

function Block({ navigation }) {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Emails,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Image,
          ],
        });

        console.log(data.length);
      }
    })();
  }, []);

  return null;
}

export { Block };
