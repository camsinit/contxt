import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Circle,
  IconButton,
  Surface,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View } from 'react-native';

const ConversationBlock = props => {
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

  return (
    <View>
      {/* Row */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row' },
          dimensions.width
        )}
      >
        {/* AvatarView */}
        <Surface
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.SurfaceStyles(theme)['Surface'], {
              borderRadius: 40,
              overflow: 'hidden',
            }),
            dimensions.width
          )}
        >
          <>
            {(
              props.contact ?? {
                id: '1',
                name: 'Sefa Yasin Okumus',
                image: {
                  url: 'https://randomuser.me/api/portraits/med/men/5.jpg',
                },
                phoneNumbers: ['+905322536737', '+902164745516'],
              }
            )?.profile_image?.url ? null : (
              <Circle
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.CircleStyles(theme)['Circle'],
                    {
                      backgroundColor: theme.colors['DarkGray'],
                      height: 40,
                      width: 40,
                    }
                  ),
                  dimensions.width
                )}
              >
                {/* InitialsText */}
                <Text
                  accessible={true}
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      fontSize: 16,
                    }),
                    dimensions.width
                  )}
                >
                  {getInitials(
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
                  )}
                </Text>
              </Circle>
            )}
          </>
          <>
            {!(
              props.contact ?? {
                id: '1',
                name: 'Sefa Yasin Okumus',
                image: {
                  url: 'https://randomuser.me/api/portraits/med/men/5.jpg',
                },
                phoneNumbers: ['+905322536737', '+902164745516'],
              }
            )?.profile_image?.url ? null : (
              <Image
                resizeMode={'cover'}
                source={{
                  uri: `${
                    (
                      props.contact ?? {
                        id: '1',
                        name: 'Sefa Yasin Okumus',
                        image: {
                          url: 'https://randomuser.me/api/portraits/med/men/5.jpg',
                        },
                        phoneNumbers: ['+905322536737', '+902164745516'],
                      }
                    )?.profile_image?.url
                  }`,
                }}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                    borderRadius: 40,
                    height: 40,
                    width: 40,
                  }),
                  dimensions.width
                )}
              />
            )}
          </>
        </Surface>
        {/* TextView */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          <TextInput
            allowFontScaling={true}
            autoCapitalize={'none'}
            autoFocus={true}
            changeTextDelay={500}
            defaultValue={
              props.text ??
              'That is the biggest damn ear hole I’ve ever felt  That is the biggest damn ear hole I’ve ever felt That is the biggest damn ear hole I’ve ever felt'
            }
            multiline={true}
            onChangeText={newTextInputValue => {
              const textInputValue = newTextInputValue;
              try {
                props.onChangeValue?.(props.id ?? '', newTextInputValue);
                if (newTextInputValue === '') {
                  props.onDelete?.(props.id ?? '');
                } else {
                }
              } catch (err) {
                console.error(err);
              }
            }}
            placeholder={'Enter what this person said'}
            scrollEnabled={false}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextInputStyles(theme)['Text Input'],
                {
                  borderBottomWidth: 0,
                  borderColor: null,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                }
              ),
              dimensions.width
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default withTheme(ConversationBlock);
