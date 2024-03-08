import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import HighligtedTextBlock from '../components/HighligtedTextBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';

const ConversationViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const stringToArray = str => {
    return str.split(' ');
  };

  const getInitials = name => {
    // Check if the input is a valid string
    if (typeof name !== 'string' || name.trim().length === 0) {
      return 'N/A';
    }

    const parts = name.split(' ').filter(Boolean); // Split the name and remove any empty strings
    let initials = '';

    if (parts.length === 1) {
      // If there's only one part, return the first character
      initials = parts[0][0];
    } else if (parts.length === 2) {
      // If there are two parts, return the first character of each
      initials = parts[0][0] + parts[1][0];
    } else if (parts.length > 2) {
      // If there are more than two parts, return the first character of the first and last parts
      initials = parts[0][0] + parts[parts.length - 1][0];
    }

    return initials.toUpperCase(); // Return the initials in uppercase
  };

  const onChangeValueFunction = value => {
    props.onChangeValue && props.onChangeValue(props.id, value);
  };

  const onDeleteFunction = () => {
    props.onDelete && props.onDelete(props.id);
  };

  return (
    <View>
      {/* NameText */}
      <Text
        accessible={true}
        allowFontScaling={true}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            fontFamily: 'Poppins_600SemiBold',
          }),
          dimensions.width
        )}
      >
        {
          (
            props.contact ?? {
              id: '1',
              name: 'Sefa Yasin Okumus',
              image: {
                url: 'https://randomuser.me/api/portraits/med/men/5.jpg',
              },
              phoneNumbers: ['+905322536737', '+902164745516'],
            }
          )?.name
        }
      </Text>
      <>
        {
          /* no custom function named isMe */ undefined ? null : (
            <HighligtedTextBlock
              searchWords={stringToArray(props.searchTerm ?? '')}
              text={
                props.text ?? 'That is the biggest damn ear hole I’ve ever felt'
              }
            />
          )
        }
      </>
    </View>
  );
};

export default withTheme(ConversationViewBlock);
