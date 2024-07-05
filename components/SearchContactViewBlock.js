import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import HighligtedTextBlock from '../components/HighligtedTextBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Circle, Surface, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';

const SearchContactViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const isMe = () => {
    return Variables?.CX_USER?.id === props?.contact?.id;
  };

  const stringToArray = str => {
    return (str || '').split(' ');
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
    <View
      style={StyleSheet.applyWidth(
        { justifyContent: 'center' },
        dimensions.width
      )}
    >
      {/* Row */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row' },
          dimensions.width
        )}
      >
        {/* AvatarView */}
        <Surface
          elevation={0}
          {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.SurfaceStyles(theme)['Surface'].style,
              {
                borderRadius: 40,
                marginRight: 10,
                minHeight: 28,
                overflow: 'hidden',
              }
            ),
            dimensions.width
          )}
        >
          {/* Circle 2 */}
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
                {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.CircleStyles(theme)['Circle'].style,
                    {
                      backgroundColor: theme.colors['DarkGray'],
                      borderColor: theme.colors['Blue'],
                      borderWidth:
                        (
                          props.contact ?? {
                            id: '1',
                            name: 'Sefa Yasin Okumus',
                            image: {
                              url: 'https://randomuser.me/api/portraits/med/men/5.jpg',
                            },
                            phoneNumbers: ['+905322536737', '+902164745516'],
                          }
                        )?.profile_type === 'user' &&
                        (
                          props.contact ?? {
                            id: '1',
                            name: 'Sefa Yasin Okumus',
                            image: {
                              url: 'https://randomuser.me/api/portraits/med/men/5.jpg',
                            },
                            phoneNumbers: ['+905322536737', '+902164745516'],
                          }
                        )?.completed_onboarding
                          ? 3
                          : 0,
                      height: 28,
                      width: 28,
                    }
                  ),
                  dimensions.width
                )}
              >
                {/* InitialsText */}
                <Text
                  accessible={true}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      { fontSize: 13 }
                    ),
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
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
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
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { borderRadius: 40, height: 28, width: 28 }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
        </Surface>
        {/* TextView */}
        <View>
          {/* NameText */}
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                fontFamily: 'Poppins_500Medium',
              }),
              dimensions.width
            )}
          >
            <>
              {isMe() ? null : (
                <HighligtedTextBlock
                  highlightMode={'search'}
                  searchWords={stringToArray(props.searchTerm ?? 'sefa')}
                  text={
                    props.nameOnly ?? false
                      ? stringToArray(
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
                        ) &&
                        stringToArray(
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
                        )[0]
                      : (
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
                />
              )}
            </>
            {/* MeText */}
            <>
              {!isMe() ? null : (
                <HighligtedTextBlock
                  highlightMode={'search'}
                  searchWords={stringToArray('Me')}
                  text={'Me'}
                />
              )}
            </>
            {null}
          </Text>
          {/* SearchedQuoteText */}
          <>
            {!(props.quoteText ?? '') ? null : (
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: theme.colors['Light'],
                      fontFamily: 'Poppins_300Light',
                      fontSize: 12,
                    }
                  ),
                  dimensions.width
                )}
              >
                <HighligtedTextBlock
                  highlightMode={'search'}
                  searchWords={stringToArray(props.searchTerm ?? 'sefa')}
                  text={props.quoteText ?? ''}
                />
                {null}
              </Text>
            )}
          </>
        </View>
      </View>
    </View>
  );
};

export default withTheme(SearchContactViewBlock);
