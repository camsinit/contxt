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
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.SurfaceStyles(theme)['Surface'], {
              borderRadius: 40,
              height: props.avatarSize ?? 40,
              minHeight: [
                { minWidth: Breakpoints.Mobile, value: null },
                { minWidth: Breakpoints.Mobile, value: props.avatarSize ?? 40 },
              ],
              overflow: 'hidden',
              width: props.avatarSize ?? 40,
            }),
            dimensions.width
          )}
        >
          <>
            {(props.contact ?? (() => {}))?.profile_image?.url ? null : (
              <Circle
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.CircleStyles(theme)['Circle'],
                    {
                      backgroundColor: theme.colors['DarkGray'],
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
                  allowFontScaling={true}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                      fontSize: 15,
                    }),
                    dimensions.width
                  )}
                >
                  {getInitials((props.contact ?? (() => {}))?.name)}
                </Text>
              </Circle>
            )}
          </>
          <>
            {!(props.contact ?? (() => {}))?.profile_image?.url ? null : (
              <Image
                resizeMode={'cover'}
                source={{
                  uri: `${(props.contact ?? (() => {}))?.profile_image?.url}`,
                }}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                    borderRadius: props.avatarSize ?? 40,
                    height: props.avatarSize ?? 40,
                    width: props.avatarSize ?? 40,
                  }),
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
                allowFontScaling={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: 'Poppins_500Medium',
                  }),
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
                      text={(props.contact ?? (() => {}))?.name}
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
                    allowFontScaling={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
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
