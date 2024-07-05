import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import HighligtedTextBlock from '../components/HighligtedTextBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Circle, Surface, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';

const ContactsViewBlock = props => {
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

  const isMe = Variables => {
    return Variables?.CX_USER?.id === props?.contact?.id;
  };

  const randomPastelColor = inputString => {
    function stringToHue(str) {
      // A simple hash function to convert a string to a number
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const character = str.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash) % 360; // Ensure the hue is between 0 and 359
    }

    // Use the hashed string to generate a hue
    const hue = stringToHue(inputString || '');

    // Set saturation and lightness to get a pastel color.
    const saturation = 60 + (hue % 21); // 60% to 80%, based on hue
    const lightness = 85 + (hue % 11); // 85% to 95%, based on hue

    // Return the pastel color in HSL format
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  React.useEffect(() => {
    try {
      /* hidden 'Log to Console' action */
    } catch (err) {
      console.error(err);
    }
  }, []);

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
                height: props.avatarSize ?? 40,
                minHeight: [
                  { minWidth: Breakpoints.Mobile, value: null },
                  {
                    minWidth: Breakpoints.Mobile,
                    value: props.avatarSize ?? 40,
                  },
                ],
                overflow: 'hidden',
                width: props.avatarSize ?? 40,
              }
            ),
            dimensions.width
          )}
        >
          <>
            {(
              props.contact ?? {
                id: 9743,
                dob: null,
                name: 'Cam ❤️ Lindsay',
                _user: {
                  id: 1,
                  name: 'Cam Lindsay',
                  last_name: 'Lindsay',
                  created_at: 1710858691391,
                  first_name: 'Cam',
                  profile_image: {
                    url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                    meta: { width: 762, height: 1143 },
                    mime: 'image/jpeg',
                    name: 'file-799c21.jpeg',
                    path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                    size: 72133,
                    type: 'image',
                    access: 'public',
                  },
                },
                emails: [],
                last_name: 'Lindsay',
                created_at: 1710906669157,
                first_name: 'Cam ❤️',
                owner_user_id: 9,
                phone_numbers: ['16178003804'],
                profile_image: null,
                connected_user_id: 1,
              }
            )?.profile_image?.url ? null : (
              <Circle
                {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.CircleStyles(theme)['Circle'].style,
                    {
                      backgroundColor: randomPastelColor(
                        (
                          props.contact ?? {
                            id: 9743,
                            dob: null,
                            name: 'Cam ❤️ Lindsay',
                            _user: {
                              id: 1,
                              name: 'Cam Lindsay',
                              last_name: 'Lindsay',
                              created_at: 1710858691391,
                              first_name: 'Cam',
                              profile_image: {
                                url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                meta: { width: 762, height: 1143 },
                                mime: 'image/jpeg',
                                name: 'file-799c21.jpeg',
                                path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                size: 72133,
                                type: 'image',
                                access: 'public',
                              },
                            },
                            emails: [],
                            last_name: 'Lindsay',
                            created_at: 1710906669157,
                            first_name: 'Cam ❤️',
                            owner_user_id: 9,
                            phone_numbers: ['16178003804'],
                            profile_image: null,
                            connected_user_id: 1,
                          }
                        )?.name
                      ),
                      borderColor: theme.colors['Strong'],
                      borderStyle: 'solid',
                      borderWidth:
                        (
                          props.contact ?? {
                            id: 9743,
                            dob: null,
                            name: 'Cam ❤️ Lindsay',
                            _user: {
                              id: 1,
                              name: 'Cam Lindsay',
                              last_name: 'Lindsay',
                              created_at: 1710858691391,
                              first_name: 'Cam',
                              profile_image: {
                                url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                meta: { width: 762, height: 1143 },
                                mime: 'image/jpeg',
                                name: 'file-799c21.jpeg',
                                path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                size: 72133,
                                type: 'image',
                                access: 'public',
                              },
                            },
                            emails: [],
                            last_name: 'Lindsay',
                            created_at: 1710906669157,
                            first_name: 'Cam ❤️',
                            owner_user_id: 9,
                            phone_numbers: ['16178003804'],
                            profile_image: null,
                            connected_user_id: 1,
                          }
                        )?.profile_type === 'user' &&
                        (
                          props.contact ?? {
                            id: 9743,
                            dob: null,
                            name: 'Cam ❤️ Lindsay',
                            _user: {
                              id: 1,
                              name: 'Cam Lindsay',
                              last_name: 'Lindsay',
                              created_at: 1710858691391,
                              first_name: 'Cam',
                              profile_image: {
                                url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                meta: { width: 762, height: 1143 },
                                mime: 'image/jpeg',
                                name: 'file-799c21.jpeg',
                                path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                size: 72133,
                                type: 'image',
                                access: 'public',
                              },
                            },
                            emails: [],
                            last_name: 'Lindsay',
                            created_at: 1710906669157,
                            first_name: 'Cam ❤️',
                            owner_user_id: 9,
                            phone_numbers: ['16178003804'],
                            profile_image: null,
                            connected_user_id: 1,
                          }
                        )?.completed_onboarding
                          ? 3
                          : 0,
                      height: props.avatarSize ?? 40,
                      width: props.avatarSize ?? 40,
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
                      { fontSize: 15 }
                    ),
                    dimensions.width
                  )}
                >
                  {getInitials(
                    (
                      props.contact ?? {
                        id: 9743,
                        dob: null,
                        name: 'Cam ❤️ Lindsay',
                        _user: {
                          id: 1,
                          name: 'Cam Lindsay',
                          last_name: 'Lindsay',
                          created_at: 1710858691391,
                          first_name: 'Cam',
                          profile_image: {
                            url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                            meta: { width: 762, height: 1143 },
                            mime: 'image/jpeg',
                            name: 'file-799c21.jpeg',
                            path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                            size: 72133,
                            type: 'image',
                            access: 'public',
                          },
                        },
                        emails: [],
                        last_name: 'Lindsay',
                        created_at: 1710906669157,
                        first_name: 'Cam ❤️',
                        owner_user_id: 9,
                        phone_numbers: ['16178003804'],
                        profile_image: null,
                        connected_user_id: 1,
                      }
                    )?.name
                  )}
                </Text>
              </Circle>
            )}
          </>
          {/* ContactImage */}
          <>
            {!(
              props.contact ?? {
                id: 9743,
                dob: null,
                name: 'Cam ❤️ Lindsay',
                _user: {
                  id: 1,
                  name: 'Cam Lindsay',
                  last_name: 'Lindsay',
                  created_at: 1710858691391,
                  first_name: 'Cam',
                  profile_image: {
                    url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                    meta: { width: 762, height: 1143 },
                    mime: 'image/jpeg',
                    name: 'file-799c21.jpeg',
                    path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                    size: 72133,
                    type: 'image',
                    access: 'public',
                  },
                },
                emails: [],
                last_name: 'Lindsay',
                created_at: 1710906669157,
                first_name: 'Cam ❤️',
                owner_user_id: 9,
                phone_numbers: ['16178003804'],
                profile_image: null,
                connected_user_id: 1,
              }
            )?.profile_image?.url ? null : (
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={{
                  uri: `${
                    (
                      props.contact ?? {
                        id: 9743,
                        dob: null,
                        name: 'Cam ❤️ Lindsay',
                        _user: {
                          id: 1,
                          name: 'Cam Lindsay',
                          last_name: 'Lindsay',
                          created_at: 1710858691391,
                          first_name: 'Cam',
                          profile_image: {
                            url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                            meta: { width: 762, height: 1143 },
                            mime: 'image/jpeg',
                            name: 'file-799c21.jpeg',
                            path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                            size: 72133,
                            type: 'image',
                            access: 'public',
                          },
                        },
                        emails: [],
                        last_name: 'Lindsay',
                        created_at: 1710906669157,
                        first_name: 'Cam ❤️',
                        owner_user_id: 9,
                        phone_numbers: ['16178003804'],
                        profile_image: null,
                        connected_user_id: 1,
                      }
                    )?.profile_image?.url
                  }`,
                }}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    {
                      borderRadius: props.avatarSize ?? 40,
                      height: props.avatarSize ?? 40,
                      width: props.avatarSize ?? 40,
                    }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
        </Surface>
        {/* TextView */}
        <>
          {props.imageOnly ?? false ? null : (
            <View
              style={StyleSheet.applyWidth(
                { marginLeft: 10 },
                dimensions.width
              )}
            >
              {/* NameText */}
              <Text
                accessible={true}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { fontFamily: 'Poppins_500Medium' }
                  ),
                  dimensions.width
                )}
              >
                {/* MeText */}
                <>
                  {!isMe(Variables) ? null : (
                    <HighligtedTextBlock
                      searchWords={stringToArray(props.searchTerm ?? '')}
                      text={'Me'}
                    />
                  )}
                </>
                <>
                  {isMe(Variables) ? null : (
                    <HighligtedTextBlock
                      searchWords={stringToArray(props.searchTerm ?? '')}
                      text={
                        (
                          props.contact ?? {
                            id: 9743,
                            dob: null,
                            name: 'Cam ❤️ Lindsay',
                            _user: {
                              id: 1,
                              name: 'Cam Lindsay',
                              last_name: 'Lindsay',
                              created_at: 1710858691391,
                              first_name: 'Cam',
                              profile_image: {
                                url: 'https://xxxn-hde9-kulk.n7c.xano.io/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                meta: { width: 762, height: 1143 },
                                mime: 'image/jpeg',
                                name: 'file-799c21.jpeg',
                                path: '/vault/eh5MAgN4/WVhHvWQ9n5a12nUSLIzvQqqAjjU/0NbFKw../file-799c21.jpeg',
                                size: 72133,
                                type: 'image',
                                access: 'public',
                              },
                            },
                            emails: [],
                            last_name: 'Lindsay',
                            created_at: 1710906669157,
                            first_name: 'Cam ❤️',
                            owner_user_id: 9,
                            phone_numbers: ['16178003804'],
                            profile_image: null,
                            connected_user_id: 1,
                          }
                        )?.name
                      }
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
                      searchWords={stringToArray(props.searchTerm ?? '')}
                      text={props.quoteText ?? ''}
                    />
                    {null}
                  </Text>
                )}
              </>
            </View>
          )}
        </>
      </View>
    </View>
  );
};

export default withTheme(ContactsViewBlock);
